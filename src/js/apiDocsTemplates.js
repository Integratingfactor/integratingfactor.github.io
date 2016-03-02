(function(){
    var app = angular.module('api-docs-templates',[]);

    app.directive('apiDocumentation', function(){
        return {
            restrict: 'E',
            templateUrl: 'api-documentation.html',
        };
    });
})();