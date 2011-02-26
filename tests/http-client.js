var http = require('http');
var options = {
	host: '127.0.0.1',
	port: 3003,
};

exports.get = function(path, callback) {
	if(!(callback)) { return;	}

	options.path = path;
	options.method = 'GET';
	http.get(options, getReponseCapture(callback));
};

exports.getPost = function(path, callback) {
	if(!(callback)) { return;	}

	options.path = path;
	options.method = 'POST';
	var req = http.request(options, getReponseCapture(callback));
	req.end();
}

function getReponseCapture(callback) {

	return function(res) {
		var response = {statusCode:
			res.statusCode, data: ''};

		res.on('data', function(chunk) {
			response.data += chunk;
		});
		res.on('end', function() {
			callback(null, response);
		})
	}
}

