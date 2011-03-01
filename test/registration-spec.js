var vows = require('vows'),
    assert = require('assert'),
    zombie = require('Zombie');

vows.describe('Event Registration').addBatch({
  'Register Guest' : {
    topic: function () {
      var callback = this.callback;
      zombie.visit('http://127.0.0.1:3003/registration', 
        function (err, browser, status) {
          browser.fill('name', 'Pablo');
          browser.pressButton('register', callback);
      });
    },
    'browser should respond without error': function (err, browser, status) {
      assert.isNull(err);
    },
    'and with http status 200': function (err, browser, status) {
      assert.equal(status, 200);
    },
    'and contain the confirmation': function (err, browser, status) {
      assert.notEqual(browser.html().indexOf('Thanks for registering Pablo!'), -1);
    }
  },
  'Register with No Name' : {
    topic: function () {
      var callback = this.callback;
      zombie.visit('http://127.0.0.1:3003/registration', function (err, browser, status) {
        browser.fill('name', '');
        browser.pressButton('register', callback);
      });
    },
    'browser should respond without error': function (err, browser, status) {
      assert.isNull(err);
    },
    'and with http status 200': function (err, browser, status) {
      assert.equal(status, 200);
    },
    'and contain the confirmation': function (err, browser, status) {
      var error = browser.querySelector("#error");
      assert.ok(error);
      assert.equal(error.textContent, 'Name must be provided')
    }
  } 
}).export(module);
