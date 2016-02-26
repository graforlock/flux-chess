var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:8080';

var service = {
  get: function(url) {
    return fetch(baseUrl + url)
    .then(function(response) {
      return response.json();
    });
  },
  post: function(url) {

  }
};

module.exports = service;
