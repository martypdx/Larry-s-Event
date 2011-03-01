express = require('express'),
connect = require('connect'),
app = express.createServer(
  express.bodyDecoder());
app.set('views', __dirname + '/views/');

var Event = require('./lib/event').getEvent();

app.get('/guests', function (request, response) {
  Event.getGuests(function(err, guests) {
    render(response, 'guests', {guests: guests});
  });
});

app.post('/guests', function (request, response) {
  console.log('name', request.param('name'));
  Event.register(request.param('name'), function(err, data) {
    console.log('error', err);
    if(err) {
      renderRegistration(response, err);
    } else {
      render(response, 'confirmation', {guest: data});
    }
  });
});

app.get('/registration', function (request, response) {
  renderRegistration(response);
});

function renderRegistration(response, error) {
  var locals = (error) ? {error: error} : null;
  render(response, 'registration', locals);  
}

function render(response, template, locals) {
	var options = { layout: false };
	if(locals) { options.locals = locals; }
	response.render(template + '.jade', options);
}

app.listen(3003);
console.log("Listening on port 3003");

/*

app.get('/registration-error', function (request, response) {
  renderRegistration(response, 'Name must be provided');
});

*/