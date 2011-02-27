var vows = require('vows'),
    assert = require('assert')

var Event = require('../lib/event').getEvent();
vows.describe('Event').addBatch({
  'An Event': {
    'when asked for guests': {
      topic: function () {
        Event.getGuests(this.callback);
      },
      'should return the standard guests':
        function (err, guests) {
          assert.deepEqual (guests,
            ['Bob', 'Sally', 'Tim', 'Joe']);
        }
    },
  'when registering Bob': {
      topic: function() {
        Event.register('Bob', this.callback);
      },
      'should return Bob':
        function (err, guest){
          assert.equal(guest, 'Bob');
        }
     }
  }
}).export(module);