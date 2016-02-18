// (function ($) {
  var clientId='test.endpoint.client';
  var clientSecret='';
  var clientAuth=btoa(clientId+':'+clientSecret);
  //var idpHost='http://localhost:8080';
  var idpHost='https://if-idp.appspot.com';
  var errorPage;

  function idpProtected(errorPage, main) {
    this.errorPage = errorPage;
    if (!isAuthenticated()) {
      console.log("User is not authenticated");
      checkTokenGrant(errorPage);
      // validateToken(window.sessionStorage.idpAccessToken, errorPage);
    } else {
      console.log("User is already authenticated");
      $(main).removeClass('hidden');
    }
  }

  function requestAccessToken(){
    console.log("requesting access token");
    window.sessionStorage.idpAccessToken=null;
    window.location.hash=null;
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
    console.log("logging out user, redirecting to: ", this.errorPage);
    window.sessionStorage.idpUser=null;
    window.location=this.errorPage;
    // goHome();
  }

  function goHome() {
    window.location='http://'+window.location.hostname+window.location.pathname;
  }

  function validateToken(accessToken, errorPage) {
    console.log("validating access token");
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
        console.log("Failed to get token: ", status, error);
        window.location=errorPage;
      });
    }
  }

  function checkTokenGrant(errorPage) {
    console.log("checking access token in location hash");
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
      console.log("found access_token in hash, validating it");
      validateToken(params['access_token'], errorPage);
    } else if (params['error']){
      console.log("Token authorization failed: ", params['error_description']);
      window.location=errorPage;
    } else {
      requestAccessToken();
    }
  }
// }(this));