exports.getEvent = function () {
  
  return new Event();

  function Event() {
    this.getGuests = function(callback) {
      callback(null, ['Bob', 'Sally', 'Tim', 'Joe']);
    };
    this.register = function(name, callback) {
      callback(null, 'Bob');
    };
  }
}