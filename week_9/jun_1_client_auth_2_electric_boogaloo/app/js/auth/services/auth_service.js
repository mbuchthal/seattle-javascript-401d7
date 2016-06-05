var baseUrl = require('../../config').baseUrl;

module.exports = function(app) {
  app.factory('cfAuth', ['$http', '$q', function($http, $q) {
    // AUTH_EXP: explain what each of these functions are accomplishing and
    // what data we're storing in this service

    // removeToken - we call this when we logout.  this is clearing the token by setting the token, username, and headers token to null. It is then clearing the local storage token by setting it to an empty string.

    // saveToken - this function is being called when we return a token from either the signin or signup routes.  saveToken is setting the returned token from our backend to the token in this service.  It sets the headers token and local storage token as well.

    // getToken - this function is called by the getUsername function in this service. It is checking to see if there is a token saved under this.token or in local storage.  It returns the token that is found.

    // getUsername - this function is returning a promise. If the username is already saved under this.username, it will return that username.  If no username is found, it is checking getToken() to see if there is a token saved under this.token, or in local storage.  If no token is found, an error is thrown.  If a token is found, it is making a GET request to /api/profile to find the username.

    return {
      removeToken: function() {
        this.token = null;
        this.username = null;
        $http.defaults.headers.common.token = null;
        window.localStorage.token = '';
      },
      saveToken: function(token) {
        this.token = token;
        $http.defaults.headers.common.token = token;
        window.localStorage.token = token;
        return token;
      },
      getToken: function() {
        this.token || this.saveToken(window.localStorage.token);
        return this.token;
      },
      getUsername: function() {
        return $q(function(resolve, reject) {
          if (this.username) return resolve(this.username);
          if (!this.getToken()) return reject(new Error('no authtoken'));

          $http.get(baseUrl + '/api/profile')
            .then((res) => {
              this.username = res.data.username;
              resolve(res.data.username);
            }, reject);
        }.bind(this));
      }
    }
  }]);
};
