(function(){
	var app = angular.module('home-templates', []);

	app.directive('homeTab', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab.html',
			controller: function($window, $log){
				this.myTab = 1;
				this.isActive = function() {
					return this.myTab === parseInt($window.sessionStorage.currTab);
				};
			},
			controllerAs: 'home'
		};
	});

	app.directive('homeTabUnsubscribed', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-unsubscribed.html'
		};
	});

	app.directive('homeTabTrial', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-trial.html'
		};
	});

	app.directive('homeTabSubscription', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-subscription.html'
		};
	});
})();