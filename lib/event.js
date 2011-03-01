exports.getEvent = function () {

  return new Event();

  function makeSafe(callback) {
    return (callback) ? callback : function(){};
  }

  function Event() {
    var guests = [];
    this.getGuests = function(callback) {
      callback = makeSafe(callback);
      callback(null, guests);
    };
    this.register = function(guest, callback) {
      callback = makeSafe(callback);
      if(!(guest) || (/^\s*$/).test(guest)) {
        if(callback) {
          callback ('Name must be provided');
        }
        return;
      }
      guests.push(guest)
      callback(null, guests[guests.indexOf(guest)]);
    };
  }

}