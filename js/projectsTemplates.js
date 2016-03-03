(function(){
	var app = angular.module('projects-templates', ['page-templates']);

	app.directive('projectsTab', function(IdpClient, TabTracker){
		return {
			restrict: 'E',
			templateUrl: '/site/projects/projects-tab.html',
			controller: function($log){
				this.myTab = 2;
				this.isActive = function() {
					return this.myTab === TabTracker.getCurrTab();
				};
			},
			controllerAs: 'projects'
		};
	});

	app.directive('projectsTabUser', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: '/site/projects/projects-tab-user.html'
		};
	});
})();