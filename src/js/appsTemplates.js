(function(){
	var app = angular.module('apps-templates', ['page-templates']);

	app.directive('appsTab', function(IdpClient, TabTracker){
		return {
			restrict: 'E',
			templateUrl: 'apps-tab.html',
			controller: function($log){
				this.myTab = 3;
				this.isActive = function() {
					return this.myTab === TabTracker.getCurrTab();
				};
			},
			controllerAs: 'apps'
		};
	});
})();