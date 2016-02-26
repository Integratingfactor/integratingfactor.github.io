(function(){
	var app = angular.module('home-templates', []);

	app.directive('homeTab', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab.html',
			controller: function($window, $log){
				this.myTab = 1;
				this.isActive = function() {
					return IdpClient.isAuthenticated() && this.myTab === parseInt($window.sessionStorage.currTab);
				};
			},
			controllerAs: 'home'
		};
	});
})();