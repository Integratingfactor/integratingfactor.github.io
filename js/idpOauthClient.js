(function(){
	var app = angular.module('idp-oauth-client', []);
	app.factory('IdpClient', function($log, $window, $http, $httpParamSerializerJQLike){
		var clientId='test.endpoint.client';
		var clientSecret='';
		var clientAuth=btoa(clientId+':'+clientSecret);
		var idpHost='https://if-idp.appspot.com';
		var errorPage;
		var redirectUrl=$window.location.protocol + '//' + $window.location.host;

		function requestAccessToken(clientId,type){
			$log.log("requesting access token");
			$window.sessionStorage.idpAccessToken=null;
			$window.location.hash=null;
			$window.location=idpHost+'/oauth/authorize?client_id='+clientId+'&response_type='+type+'&redirect_uri='+redirectUrl;
		}

		// function goHome() {
		// 	// $window.location='http://'+$window.location.hostname+$window.location.pathname;
		// 	$window.location=redirectUrl;
		// }

		function validateToken(accessToken, returnTo) {
			$log.log("validating access token");
			if (accessToken && typeof accessToken != "undefined" && accessToken != "null") {
			  $http({
			    url:idpHost+'/oauth/check_token',
			    method: "POST",
			    headers: {
			      Authorization: "Basic " + clientAuth,
			      'Content-Type': 'application/x-www-form-urlencoded'
			    },
			    data: $httpParamSerializerJQLike({
			      token: accessToken
			    })
			  })
			  .success(function (data) {
			    $log.log("validated token: ", JSON.stringify(data));
			    $window.sessionStorage.idpUser=JSON.stringify(data);
			    $window.location=returnTo;
			  })
			  .error(function (req, status, error) {
			    $log.log("Failed to validate token: ", status, error);
			    $window.location=returnTo;
			  });
			}
		}

		function checkTokenGrant(returnTo) {
			$log.log("checking access token in location hash");
			// First, parse the query string
			var params = {}, queryString = $window.location.hash.substring(1),
			    regex = /([^&=]+)=([^&]*)/g, m;
			while (m = regex.exec(queryString)) {
			  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
			}

			// Verify that we have a token grant
			if (params['access_token']) {
			  // remove hash fragments from location
			  $log.log("found access_token in hash, validating it", params['access_token']);
			  validateToken(params['access_token'], returnTo);
			} else if (params['error']){
			  $log.log("Token authorization failed: ", params['error_description']);
			  $window.location=returnTo;
			}
		}


		return {
			idpInitialize: function(returnTo) {
				$log.log('idp initialize called');
				checkTokenGrant(returnTo);
			},
			getUser: function() {
				var user = JSON.parse($window.sessionStorage.idpUser);
				return {
					firstName: user['given_name'],
					lastName: user['family_name'],
					roles: user['org_roles'],
					org: user['org_id']
				};
			},
			idpLogin: function(onSuccess) {
				$log.log('idp login called');
				if (!this.isAuthenticated()) {
				  $log.log("User is not authenticated");
				  requestAccessToken(clientId, 'token', 'http://'+$window.location.hostname+$window.location.pathname);
				} else {
				  $log.log("User is already authenticated");
				  onSuccess(JSON.parse($window.sessionStorage.idpUser));
				}
			},
			idpLogout: function() {
				$log.log("logging out user");
				$window.sessionStorage.idpUser=null;
			},
			isAuthenticated: function () {
				return $window.sessionStorage.idpUser && typeof $window.sessionStorage.idpUser !== "undefined" && $window.sessionStorage.idpUser !== "null" && JSON.parse($window.sessionStorage.idpUser).exp * 1000 > Date.now();
			},
			isAuthorized: function(role, tenant) {
				if (!this.isAuthenticated()) {
					return false;
				}
				var idp = JSON.parse($window.sessionStorage.idpUser);
				return (!role || $.inArray(role, idp['org_roles']) !== -1) && (!tenant || tenant == idp['org_id']);
			}
		};
	});
})();