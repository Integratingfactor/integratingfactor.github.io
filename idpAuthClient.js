// (function ($) {
  var clientId='test.endpoint.client';
  var clientSecret='';
  var clientAuth=btoa(clientId+':'+clientSecret);
  //var idpHost='http://localhost:8080';
  var idpHost='https://if-idp.appspot.com';

  function idpProtected(errorPage) {
    if (!isAuthenticated()) {
      console.log("User is not authenticated");
      checkTokenGrant(errorPage);
      // validateToken(window.sessionStorage.idpAccessToken, errorPage);
    } else {
      console.log("User is already authenticated");      
    }
  }

  function requestAccessToken(){
    window.sessionStorage.idpAccessToken=null;
    window.location=idpHost+'/oauth/authorize?client_id='+clientId+'&response_type=token&redirect_uri='+'http://'+window.location.hostname+window.location.pathname;
  }

  function isAuthenticated() {
    console.log(window.sessionStorage.idpUser);
    return window.sessionStorage.idpUser && typeof window.sessionStorage.idpUser !== "undefined" && window.sessionStorage.idpUser !== "null";
  }

  function getIdpUser(param) {
    return JSON.parse(window.sessionStorage.idpUser).param;
  }

  function idpLogout(){
    console.log("logging out user");
    window.sessionStorage.idpUser=null;
    goHome();
  }

  function goHome() {
    window.location='http://'+window.location.hostname+window.location.pathname;
  }

  function validateToken(accessToken, errorPage) {
    if (accessToken && typeof accessToken != "undefined" && accessToken != "null") {
      $.ajax({
        url:idpHost+'/oauth/check_token',
        type: "POST",
        headers: {
          Authorization: "Basic " + clientAuth
        },
        data: {
          token: accessToken
        }
      })
      .success(function (data) {
        console.log("validated token: ", JSON.stringify(data));
        window.sessionStorage.idpUser=JSON.stringify(data);
        goHome();
      })
      .error(function (req, status, error) {
        console.log("Failed to authenticate: ", status, error);
        window.location=errorPage;
      });
    }
  }

  function checkTokenGrant(errorPage) {
    // First, parse the query string
    var params = {}, queryString = location.hash.substring(1),
        regex = /([^&=]+)=([^&]*)/g, m;
    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    // Verify that we have a token grant
    if (params['access_token']) {
      // save access token in session storage
      // window.sessionStorage.idpAccessToken=params['access_token'];
      // goHome();

      // remove hash fragments from location
      location.hash=null;
      validateToken(params['access_token'], errorPage);
    } else {
      requestAccessToken();
    }
  }
// }(this));