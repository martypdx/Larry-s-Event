var vows = require('vows'),
assert = require('assert'),
fs = require('fs');

var client = require('./http-client');

vows.describe('Larry\'s Event Registration').addBatch({
  'Registration confirmation': getContext('confirmation', function () {
    client.getPost('/guests', 'Bob', this.callback);
  })
}).addBatch({
  'Guest list confirmation': getContext('guests', function () {
    client.get('/guests', this.callback);
  })
}).addBatch({
  'Registration form': getContext('registration', function () {
    client.get('/registration', this.callback);
  }),
  'Registration form with error': getContext('registration-error', function () {
    client.get('/registration-error', this.callback);
  })
}).export(module);

function getContext(standard, httpGet) {
  return {
    topic: httpGet,
    'should return the standard': function (err, httpResponse) {
      var file = './html standards/' + standard + '.html';
      var response = fs.readFileSync(file); //, function(err, response) {
      //assert.isNull(err);
        assert.equal(httpResponse.data, response.toString());
      //}
    }
  }

}

