express = require('express'),
connect = require('connect'),
app = express.createServer();
app.set('views', __dirname + '/views/');

app.get('/guests', function (request, response) {
  Render(response, 'guests', 
    {guests: ['Bob', 'Sally', 'Tim', 'Joe']});
});

app.post('/guests', function (request, response) {
  Render(response, 'confirmation', {guest: 'Bob'});
});

function Render(response, template, locals) {
	var options = { layout: false };
	if(locals) { options.locals = locals; }
	response.render(template + '.jade', options);
}

app.listen(3003);
console.log("Listening on port 3003");

