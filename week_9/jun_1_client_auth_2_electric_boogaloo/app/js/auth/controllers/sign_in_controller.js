var baseUrl = require('../../config').baseUrl;
module.exports = function(app) {
  app.controller('SignInController', ['$http', '$location', 'cfHandleError', 'cfAuth', function($http, $location, handleError, auth) {
    // AUTH_EXP: how does this differ from the sign_up_controller?
    // This controller is for existing users.
    // The sign in controller is making a GET request with Authorization headers being set.
    // Window.btoa is taking the string and 64bit encoding it for the backend basic http
    // This is for verifying the user exists in the backend and returning a token

    this.buttonText = 'Sign in to existing user';
    this.errors = [];
    this.authenticate = function(user) {
      $http({
        method: 'GET',
        url: baseUrl + '/api/signin',
        headers: {
          'Authorization': 'Basic ' + window.btoa(user.username + ':' + user.password)
        }
      })
        .then((res) => {
          auth.saveToken(res.data.token);
          auth.getUsername();
          $location.path('/bears');
        }, handleError(this.errors, 'could not sign into user'));
    };
  }]);
};
