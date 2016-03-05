(function(){
	var app = angular.module('devPortal', ['page-templates', 'home-templates', 'projects-templates', 'apps-templates', 'idp-oauth-client', 'if-studio-client']);

	app.controller('DevPortalController', function(IfProjects, IdpClient, $log){

		IdpClient.idpInitialize(function(){
			IfProjects.loadAllProjects(function() {
		        $log.log('all projects loaded');
			});
		});

		this.getLoginToggle = function() {
			return IdpClient.isAuthenticated() ? 'Logout' : 'iF Login';
		};
		this.doLoginToggle = function() {
			if (IdpClient.isAuthenticated()) {
				IdpClient.idpLogout();
			} else {
				IdpClient.idpLogin(function(){
				});				
			}
		};
		this.isPricingEnabled = function() {
			return false;
		};
		this.isGuest = function() {
			return !this.isAuthorized('USER', 'devnet-alpha.integratingfactor.com');
		};
		this.isAuthorized = function(role) {
			return IdpClient.isAuthorized(role, 'devnet-alpha.integratingfactor.com');
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