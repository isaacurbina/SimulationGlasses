var http = require("http");

http.createServer(serverRequest).listen(8888);

function serverRequest(req, resp) {
	console.log("Request sent");
	resp.writeHead(200,{"Content Type": "text/html"});
	resp.write("<h1>Welcome to node.js</h1>");

	http.get("http://www.cuevana.tv", function(resp){
	  resp.on('data', function(chunk){
	    //do something with chunk
	    //console.log("Data: ");
	    //console.log(chunk);
	    resp.write("<p>"+chunk+"");
	  });
	}).on("error", function(e){
	  console.log("Got error: " + e.message);
	});

	resp.end();
}

console.log("Servidor creado");

/*
var http = require('http');

http.createServer(function(request, response) {
  var proxy = http.createClient(80, request.headers['host'])
  var proxy_request = proxy.request(request.method, request.url, request.headers);
  proxy_request.addListener('response', function (proxy_response) {
    proxy_response.addListener('data', function(chunk) {
      response.write(chunk, 'binary');
    });
    proxy_response.addListener('end', function() {
      response.end();
    });
    response.writeHead(proxy_response.statusCode, proxy_response.headers);
  });
  request.addListener('data', function(chunk) {
    proxy_request.write(chunk, 'binary');
  });
  request.addListener('end', function() {
    proxy_request.end();
  });
}).listen(8080);
*/
/*
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
*/
/*
//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("X-Frame-Options", "ALLOW");
  next();
}
 
app.configure(function () {
  app.set('port', config.interfaceServerPort);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(allowCrossDomain);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});
 
app.configure('development', function(){
  app.use(express.errorHandler());
});
 
// API routes
app.get('/list/vms', routes.listGroup);
app.get('/list/vms/:ip', routes.listSingle);
app.get('/list/daemons', routes.listDaemons);
*/