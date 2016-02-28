(function(){
	var app = angular.module('home-templates', ['page-templates']);

	app.directive('homeTab', function(IdpClient, TabTracker){
		return {
			restrict: 'E',
			templateUrl: 'home-tab.html',
			controller: function($log){
				this.myTab = 1;
				this.isActive = function() {
					return this.myTab === TabTracker.getCurrTab();
				};
			},
			controllerAs: 'home'
		};
	});

	app.directive('homeTabGuest', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-guest.html'
		};
	});

	app.directive('homeTabUser', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-user.html'
		};
	});
})();