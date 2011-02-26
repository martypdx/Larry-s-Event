express = require('express'),
connect = require('connect'),
app = express.createServer();
app.set('views', __dirname + '/views/');

app.get('/guests', function (request, response) {
  response.render('guests.jade',
          { layout: false, });
});

app.post('/guests',
  function (request, response) {
    response.render('confirmation.jade',
      { layout: false });
  });

function Render(response, template) {
	var options = { layout: false };
	response.render(template + '.jade', options);
}

app.listen(3003);
console.log("Listening on port 3003");

