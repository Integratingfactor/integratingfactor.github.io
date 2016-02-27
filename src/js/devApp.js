(function(){
	var app = angular.module('devPortal', ['page-templates', 'home-templates', 'projects-templates', 'apps-templates', 'idp-oauth-client']);

	app.controller('DevPortalController', function(IdpClient, $log){

		IdpClient.idpInitialize('/');

		this.getLoginToggle = function() {
			return IdpClient.isAuthenticated() ? 'Logout' : 'Login';
		};
		this.doLoginToggle = function() {
			if (IdpClient.isAuthenticated()) {
				IdpClient.idpLogout();
			} else {
				IdpClient.idpLogin(function(idp){
				});				
			}
		}
		this.isGuest = function() {
			return !this.isAuthorized('TRIAL') && !this.isAuthorized('SUBSCRIPTION');
		};
		this.isAuthorized = function(role) {
			return IdpClient.isAuthorized(role, 'users-alpha.integratingfactor.com');
		};
		this.greeting = function() {
			if (IdpClient.isAuthenticated()) {
				return 'Hello ' + IdpClient.getUser().firstName + '!';
			} else {
				return 'Welcome!';
			};
		};
	});
})();