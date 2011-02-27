express = require('express'),
connect = require('connect'),
app = express.createServer();
app.set('views', __dirname + '/views/');

var Event = {};
Event.getGuests = function(callback) {
  callback(null, ['Bob', 'Sally', 'Tim', 'Joe']);
};
Event.register = function(name, callback) {
  callback(null, 'Bob');
};

app.get('/guests', function (request, response) {
  Event.getGuests(function(err, data) {
    Render(response, 'guests', {guests: data});
  });
});

app.post('/guests', function (request, response) {
  Event.register(request.param('name'), function(err, data) {
    Render(response, 'confirmation', {guest: data});
  });
});

function Render(response, template, locals) {
	var options = { layout: false };
	if(locals) { options.locals = locals; }
	response.render(template + '.jade', options);
}

app.listen(3003);
console.log("Listening on port 3003");

