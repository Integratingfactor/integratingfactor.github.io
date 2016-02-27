(function(){
	var app = angular.module('home-templates', []);

	app.directive('homeTab', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab.html',
			controller: function($window, $log){
				this.myTab = 1;
				this.isActive = function() {
					// return IdpClient.isAuthenticated() && this.myTab === parseInt($window.sessionStorage.currTab);
					return this.myTab === parseInt($window.sessionStorage.currTab);
				};
				this.isAuthorized = function() {
					return IdpClient.isAuthorized('USER', 'devnet.integratingfactor.com');
				};
				this.greeting = function() {
					if (IdpClient.isAuthenticated()) {
						return 'Hello ' + IdpClient.getUser().firstName + '!';
					} else {
						return 'Welcome!';
					}
				}
			},
			controllerAs: 'home'
		};
	});
})();