(function(){
	var app = angular.module('apps-templates', []);

	app.directive('appsTab', function(IdpClient){
		return {
			restrict: 'E',
			templateUrl: 'apps-tab.html',
			controller: function($window, $log){
				this.myTab = 3;
				this.isActive = function() {
					// return IdpClient.isAuthenticated() && this.myTab === parseInt($window.sessionStorage.currTab);
					return this.myTab === parseInt($window.sessionStorage.currTab);
				};
			},
			controllerAs: 'apps'
		};
	});
})();