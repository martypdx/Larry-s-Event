var vows = require('vows'),
assert = require('assert')

var events = require('../lib/event');
var Event = events.getEvent();
var noCallbackEvent = events.getEvent();

vows.describe('An Event')
.addBatch({
  'when guests register' : registerGuests('Bob', 'Sally', 'Tim', 'Joe'),
  'with missing name' : noMissingNames({
    'empty string': '',
    'null': null,
    'white space': '    ',
    'undefined': undefined}),
}).addBatch({
  'when asked for guests': {
    topic: function () {
      Event.getGuests(this.callback);
    },
    'should return the standard guests': function (err, guests) {
      assert.deepEqual (guests,
      ['Bob', 'Sally', 'Tim', 'Joe']);
    }
  },

}).addBatch({
  'No callback provided' : {
    'on getGuests' : { topic: noCallbackEvent.getGuests(), 'is safe': function(){} },
    'on register' : { topic: noCallbackEvent.register('Opal'), 'is safe': function(){}  }
  }
}).export(module);

function registerGuests() {
  var context = {};
  for(arg in arguments) {
    var guest = arguments[arg];
    context['like ' + guest] = registerGuest(guest);
  }
  return context;
}

function registerGuest(guest) {
  var context = {};
  context.topic = function() {
    Event.register(guest, this.callback);
  };
  context['should not return any errors'] = function (err, ignore) {
    assert.isNull(err);
  };
  context['should confirm ' + guest] = function (err, response) {
    assert.equal(response, guest);
  }
  return context;
}

function noMissingNames(missingNames) {
  var context = {};
  for(label in missingNames) {
    context[label] = noMissingName(missingNames[label]);
  }
  return context;
}

function noMissingName(missingName) {
  return {
    topic: function() {
      Event.register(missingName, this.callback);
    },
    'should return an error': function (err, ignore) {
      assert.isNotNull(err);
    }
  };
}

//Explorations and step preservations

/*
vows.describe('An Event')
.addBatch({
'when guests register' : {
  'like Bob': registerGuest('Bob'),
  'like Sally': registerGuest('Sally'),
  'like Tim': registerGuest('Tim'),
  'like Joe': registerGuest('Joe')
}
}).addBatch({
  'when asked for guests': {
    topic: function () {
      Event.getGuests(this.callback);
    },
    'should return the standard guests': function (err, guests) {
      assert.deepEqual (guests,
      ['Bob', 'Sally', 'Tim', 'Joe']);
    }
  },
}).export(module);
*/
/*
vows.describe('An Event').addBatch({
  'Guest registration' : {
    'for Bob': {
      topic: function() {
        Event.register('Bob', this.callback);
      },
      'should confirm Bob':
        function (err, guest){
          assert.equal(guest, 'Bob');
        }
     },
    //repeat for other guests
    'confirmation': {
      'for guests': {
        topic: function () {
          Event.getGuests(this.callback);
        },
        'should return the standard guests': 
          function (err, guests) {
            assert.deepEqual (guests,
              ['Bob', 'Sally']);
          }
      }
    }
  }
}).export(module);
*/

/*
vows.describe('An Event')
.addBatch({
  'when guests register' : registerGuests('Bob', 'Sally', 'Tim', 'Joe')
}).addBatch({
  'when asked for guests': {
    topic: function () {
      Event.getGuests(this.callback);
    },
    'should return the standard guests': function (err, guests) {
      assert.deepEqual (guests,
      ['Bob', 'Sally', 'Tim', 'Joe']);
    }
  },

}).export(module);
*/
/*
function registerGuests() {
  var context = {}
  context[]
}
*/




/*
function registerGuest() {
  return {
    topic: function() {
      Event.register(guest, this.callback);
    },
    'should confirm Bob': function (err, guest) {
      assert.equal(guest, guest);
    }
  };
}
*/

/*

vows.describe('An Event')
.addBatch({
  'when guests register' : {
    'like Bob': registerGuest('Bob'),
    'like Sally': registerGuest('Sally'),
    'like Time': registerGuest('Tim'),
    'like Joe': registerGuest('Joe')
  }
}).addBatch({
  'when asked for guests': {
    topic: function () {
      Event.getGuests(this.callback);
    },
    'should return the standard guests': function (err, guests) {
      assert.deepEqual (guests,
      ['Bob', 'Sally', 'Tim', 'Joe']);
    }
  },

}).export(module);

function registerGuest(guest) {
  var context = {};
  context.topic = function() {
      Event.register(guest, this.callback);
    }
  context['should confirm ' + guest] = function (err, response) {
      assert.equal(response, guest);
    }  
  return context;
}
 */