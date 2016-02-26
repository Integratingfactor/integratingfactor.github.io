(function(){
	var app = angular.module('devPortal', ['page-templates', 'home-templates', 'projects-templates', 'apps-templates', 'idp-oauth-client']);

	app.controller('DevPortalController', function(IdpClient, $log){
		var store = this;
		store.greeting = "Please wait!";
		IdpClient.idpProtected('/error.html', function(idp){
			store.greeting = 'Hello ' + idp['given_name'] + '!';
		});

		this.isAuthenticated = function () {
			return IdpClient.isAuthenticated();
		};
	});
})();