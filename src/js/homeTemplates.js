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
			title: '#ProtectNotHide',
			intro: 'Introducing Web Security as a Service ...',
			body: '<p>Develop, build and deploy web/cloud connected applications with enterprise grade security that scales as your application and customer base grows.</p>'+
			'<p>Integratingfactor.com IDP service provides following Web Security as a Service offerings<ul>'+
			'<li>AuthN/AuthZ framework using OAuth2</il>'+
			'<li>RBAC customized to your application needs</li>'+
			'<li>Usage throttling customized to your application needs</li>'+
			'<li>Secured user on-boarding and multi-factor authentication</li>'+
			'<li>Protection against liability from security breach</li>'+
			'</ul></p><p class="lead">Develop secured products with RBAC from blogs to banks.</p>'
		},
		{
			title: '#BYOI',
			intro: 'Integratingfactor.com framework is built with "Bring Your Own Identity" model...',
			body: '<p>End users should not have to create multiple different accounts to access multiple different applications. Also, applications should be able to work together for a single user, with appropriate authorizations from the end user.'+
			'<p>This translates to following end user benefits:'+
			'<ul><li>easier to adopt strong credentials because user does not have to remember multiple different credentials</il>'+
			'<li>centralized multi-factor authentication for all services, reducing/mitigating account hijacking and spoofing</li>'+
			'<li>simplified user experience with single identity to access different applications</li></p>' +
			'</ul><p>Application developer benefits:<ul>' +
			'<li>BYOI model reduces cost of security implementation significantly with amortization acrosss multiple applications</li>' +
			'<li>no additional federation work required to implement inter-operability between 3rd party applications' +
			'<li>applications have no additional cost to leverage continuous imporovements in security features for user identity management</li>'+
			'</ul></p><p class="lead">Reduce your liability, increase your profitability and build secured products faster with no upfront cost.</p>'
		},
		{
			title: 'Free Projects <button disabled class="btn btn-success pull-right">Coming soon</button>',
			intro: 'Developers can create free projects with following features...',
			body:'<table class="table"><tbody><tr><td>2 free Endpoint app registrations</td><td>Endpoint apps are the clients in your project distributed to end users to access your application (e.g. mobile apps, javascript clients)</td></tr><tr><td>1 free Backend app registration</td><td>Backend apps are the services in your project that endpoint clients interact with</td></tr><tr><td>1k on-boarded users</td><td>Upto 1000 users can be on-boarded for free with each project</td></tr><tr><td>Custom user roles</td><td>Projects can define custom roles for users, in addition to standard roles</td></tr></tbody></table>'
		}
	]
})();