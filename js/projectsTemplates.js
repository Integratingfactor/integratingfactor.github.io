(function(){
	var app = angular.module('projects-templates', []);

	app.directive('projectsTab', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'projects-tab.html',
			controller: function($window, $log){
				this.myTab = 2;
				this.isActive = function() {
					return IdpClient.isAuthenticated() && this.myTab === parseInt($window.sessionStorage.currTab);
				};
			},
			controllerAs: 'projects'
		};
	});
})();