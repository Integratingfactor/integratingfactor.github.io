(function(){
	var app = angular.module('home-templates', ['page-templates']);

	app.directive('homeTab', function(TabTracker){
		return {
			restrict: 'E',
			templateUrl: '/site/home/home-tab.html',
			controller: function($log){
				this.myTab = 1;
				this.isActive = function() {
					return this.myTab === TabTracker.getCurrTab();
				};
				this.getSectionItems = function() {
					return homeSectionItems;
				}
			},
			controllerAs: 'home'
		};
	});

	app.directive('homeTabGuest', function(){
		return {
			restrict: 'E',
			templateUrl: '/site/home/home-tab-guest.html'
		};
	});

	app.directive('homeTabUser', function(){
		return {
			restrict: 'E',
			templateUrl: '/site/home/home-tab-user.html'
		};
	});

	app.directive('homeTabSection', function(){
		return {
			restrict: 'E',
			templateUrl: '/site/home/home-tab-section.html',
			controller: function($log) {
				this.getTitle = function(index) {
					return homeSectionItems[index].title;
				};
				this.getIntro = function(index) {
					return homeSectionItems[index].intro;
				};
				this.getBody = function(index) {
					return homeSectionItems[index].body;
				};
			},
			controllerAs: 'section'
		};
	});

	app.filter("sanitize", ['$sce', function($sce) {
	  return function(htmlCode){
	    return $sce.trustAsHtml(htmlCode);
	  }
	}]);

	var homeSectionItems = [
		{
			title: 'Free Projects <button disabled class="btn btn-success pull-right">Coming soon</button>',
			intro: 'Developers can create free projects with following features...',
			body:'<table class="table"><tbody><tr><td>2 free Endpoint apps</td><td>Endpoint apps are the clients in your project distributed to end users to access your application</td></tr><tr><td>1 free Backend app</td><td>Backend apps are the services in your project that endpoint clients interact with</td></tr><tr><td>1k registered users</td><td>Upto 1000 users can be registered for free with each project</td></tr><tr><td>Custom user roles</td><td>Projects can define custom roles for users, in addition to standard roles</td></tr></tbody></table>'
		},
		{
			title: 'Premium Projects<button disabled class="btn btn-success pull-right">Coming soon</button>',
			intro: 'Upgrade projects as they grow for following premium features...',
			body: '<table class="table"><tbody><tr><td>additional Endpoint apps</td><td>$1 / mo / app</td></tr><tr><td>additional Backend apps</td><td>$10 / mo / app</td></tr><tr><td>additional active users</td><td>$10 / mo / 1k users</td></tr><tr><td>Service app for user management</td><td>$100 / mo</td></tr></tbody></table>'
		},
		{
			title: 'test title',
			intro: 'test intro...',
			body: 'test body contents'
		}
	]
})();