(function(){
	var app = angular.module('projects-templates', ['page-templates']);

	app.directive('projectsTab', function(IdpClient, TabTracker){
		return {
			restrict: 'E',
			templateUrl: 'projects-tab.html',
			controller: function($log){
				this.myTab = 2;
				this.isActive = function() {
					return this.myTab === TabTracker.getCurrTab();
				};
			},
			controllerAs: 'projects'
		};
	});

	app.directive('projectsTabGuest', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'home-tab-guest.html'
		};
	});

	app.directive('projectsTabUser', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'projects-tab-user.html'
		};
	});
})();