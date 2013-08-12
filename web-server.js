/**
 * Module dependencies
 */

var express = require('express');
var path = require('path');
var app = module.exports = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(require('less-middleware')({
  dest: path.join(__dirname, 'public', 'app-build', 'css'),
  src: path.join(__dirname, 'public', 'app-src', 'less'),
  prefix: '/app-build/css',
  force: true, // Always re-compile less files on each request.
  compress: true
})); // needs to be declared before static middleware (in order to get the recompile working)
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// serve index and view partials
app.get('/', function (req, res) {
  var isDebugging = (req.query.debug !== undefined);
  res.render('index', {inProduction: isDebugging});
});

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});

// serve index and view partials
app.get('*', function (req, res) {
  var isDebugging = (req.query.debug !== undefined);
  res.render('index', {inProduction: isDebugging});
});


var socketUser = {username: 'horst'};

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });

  socket.on('counter.start', function(data) {
//    socket.broadcast.emit("asdf", {hello: 'broadcast'});
    io.sockets.emit("horst", { hello: 'asdkasldk' });
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});