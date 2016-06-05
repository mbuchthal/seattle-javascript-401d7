module.exports = function(app) {
  app.controller('AuthController', ['cfAuth', 'cfHandleError',  '$location', function(auth, handleError, $location) {
    this.username = '';
    this.errors = [];
    this.getUsername = function() {
      // AUTH_EXP: What happens when this function is called?
      // This function is calling the getUsername function in the 'cfAuth' service.
      // A promise is returned - and the currentUser is set to the returned username
      // Finally, there is a customer error message set if the username can not be retrieved.
      auth.getUsername()
        .then((currentUser) => {
          this.username = currentUser;
        }, handleError(this.errors, 'could not get username'));
    }.bind(this);

    this.logout = function() {
      auth.removeToken();
      this.username = '';
      $location.path('/signin');
    }.bind(this);
  }]);
};
