var http = require('http');
var server = http.createServer();


console.log("Hola mundo!");

function control(petic, resp) {
	resp.writeHead(200, {'content-type': 'text/plain'});
	resp.write('Hola, Mundo!');
	resp.end();
}

server.on('request', control);
server.listen(8080);
