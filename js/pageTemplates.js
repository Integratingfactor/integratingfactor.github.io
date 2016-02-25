(function(){
	var app = angular.module('page-templates', []);

	app.directive('pageHeader', function(){
		return {
			restrict: 'E',
			templateUrl: 'page-header.html'
		};
	});


	app.directive('pageFooter', function(){
		return {
			restrict: 'E',
			templateUrl: 'page-footer.html'
		};
	});
})();