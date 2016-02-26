(function(){
	var app = angular.module('page-templates', []);

	app.directive('pageHeader', function(){
		return {
			restrict: 'E',
			templateUrl: 'page-header.html',
			controller: function($window, $log){
				var currTab = parseInt($window.sessionStorage.currTab);
				if (currTab && typeof currTab != "undefined" && currTab != "null") {
					this.tab = currTab;
				} else {
					this.tab = 1;
					$window.sessionStorage.currTab = 1;					
				}

				this.isSet = function(checkTab) {
					return this.tab === checkTab;
				};

				this.setTab = function(setTab) {
					this.tab = setTab;
					$window.sessionStorage.currTab = setTab;
				};

			},
			controllerAs: 'headers'
		};
	});


	app.directive('pageFooter', function(){
		return {
			restrict: 'E',
			templateUrl: 'page-footer.html'
		};
	});
})();