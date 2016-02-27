(function(){
	var app = angular.module('devPortal', ['page-templates', 'home-templates', 'projects-templates', 'apps-templates', 'idp-oauth-client']);

	app.controller('DevPortalController', function(IdpClient, $log){
		// IdpClient.idpProtected('/error.html', function(idp){

		// });

		// this.isAuthenticated = function () {
		// 	return IdpClient.isAuthenticated();
		// };
	});
})();