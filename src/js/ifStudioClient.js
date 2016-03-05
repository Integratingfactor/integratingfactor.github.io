(function(){
    var app = angular.module('if-studio-client', []);
    app.factory('IfStudioClient', function(IdpClient, $log, $http, $httpParamSerializerJQLike){
        var apiBase='https://dev-portal-service.appspot.com/api/v1/';
        // var apiBase='http://localhost:8080/api/v1/';
        // function httpGet(url, onSuccess, onError) {
        //       // $log.log("using access token:" + IdpClient.getToken());
        //       $http({
        //         url: url,
        //         method: "GET",
        //         headers: {
        //           Authorization: "Bearer " + IdpClient.getToken(),
        //           'Content-Type': 'application/json'
        //         },
        //       })
        //       .success(function (data) {
        //         onSuccess(data);
        //       })
        //       .error(function (req, status, error) {
        //         onError(status);
        //       });
        // };
        // function httpPost(url, body, onSuccess, onError) {
        //       // $log.log("using access token:" + IdpClient.getToken());
        //       $http({
        //         url: url,
        //         method: "POST",
        //         headers: {
        //           Authorization: "Bearer " + IdpClient.getToken(),
        //           'Content-Type': 'application/json'
        //         },
        //         data: body
        //       })
        //       .success(function (data) {
        //         onSuccess(data);
        //       })
        //       .error(function (req, status, error) {
        //         onError(status);
        //       });
        // };
        // function httpPut(url, body, onSuccess, onError) {
        //       // $log.log("using access token:" + IdpClient.getToken());
        //       $http({
        //         url: url,
        //         method: "PUT",
        //         headers: {
        //           Authorization: "Bearer " + IdpClient.getToken(),
        //           'Content-Type': 'application/json'
        //         },
        //         data: body
        //       })
        //       .success(function (data) {
        //         onSuccess(data);
        //       })
        //       .error(function (req, status, error) {
        //         onError(status);
        //       });
        // };
        function httpReq(method, url, body, onSuccess, onError) {
              // $log.log("using access token:" + IdpClient.getToken());
              $http({
                url: url,
                method: method,
                headers: {
                  Authorization: "Bearer " + IdpClient.getToken(),
                  'Content-Type': 'application/json'
                },
                data: body
              })
              .success(function (data) {
                onSuccess(data);
              })
              .error(function (req, status, error) {
                onError(status);
              });
        };
        return {
            registerDeveloper: function(onSuccess, onError) {
                $log.log("registering developer");
            },
            getAllProjects: function(onSuccess, onError) {
                $log.log("get all projects for user");
                // httpGet(apiBase + 'projects', onSuccess, onError);
                httpReq('GET', apiBase + 'projects', null, onSuccess, onError);
            },
            registerProject: function(proj, onSuccess, onError) {
                $log.log("creating project with details" + proj);
                // httpPost(apiBase + 'projects', proj, onSuccess, onError);
                httpReq('POST', apiBase + 'projects', proj, onSuccess, onError);
            },
            updateProject: function(orgId, proj, onSuccess, onError) {
                $log.log("updating project with details" + proj);
                // httpPut(apiBase + 'projects/' + orgId, proj, onSuccess, onError);
                httpReq('PUT', apiBase + 'projects/' + orgId, proj, onSuccess, onError);
            },
            getProjectDetails: function(orgId, onSuccess, onError) {
                $log.log("getting project details for " + orgId);
                // httpGet(apiBase + 'projects/' + orgId, onSuccess, onError);
                httpReq('GET', apiBase + 'projects/' + orgId, null, onSuccess, onError);
            },
            removeProject: function(orgId, onSuccess, onError) {
                $log.log("removing project " + orgId);
                httpReq('DELETE', apiBase + 'projects/' + orgId, null, onSuccess, onError);
            },
            getAllApps: function(orgId, onSuccess, onError) {
                $log.log("getting all apps for poject " + orgId);
                httpReq('GET', apiBase + 'projects/' + orgId + '/apps', null, onSuccess, onError);
            },
            getAppDetails: function(orgId, clientId, onSuccess, onError) {
                $log.log("getting app details for " + clientId);
                httpReq('GET', apiBase + 'projects/' + orgId + '/apps/' + clientId, null, onSuccess, onError);
            }
        };
    });
})();