var vows = require('vows'),
assert = require('assert'),
fs = require('fs');

var client = require('./http-client');

vows.describe('Event Registration Confirmation').addBatch({
  'Guest List Confirmation': getContext('guests', function () {
    client.get('/guests', this.callback);
  }),
  'Registration Confirmation': getContext('confirmation', function () {
    client.getPost('/guests', this.callback);
  })
}).export(module);

function getContext(standard, httpGet) {
  return {
    topic: httpGet,
    'should return the standard': function (err, httpResponse) {
      fs.readFile('./html standards/' + standard + '.html', function(err, response) {
        assert.isNull(err);
        assert.equal(httpResponse.data, response);
      });
    }
  }
}

