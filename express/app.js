
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// use calls function under all conditions, this will log, then redirect to the desired route, all underlying middleware probably do this underneith
app.use(function(req,res,next){
	console.log('use fn');
	next(); // better than redirect, moves directly to next part of function heirarchy
	// res.redirect('/');
});

// configuring environment variables
// development only
// if ('development' == app.get('env')) {
//   app.use(express.errorHandler());
// }
// equiv
app.configure('development',function(){
	app.use(express.errorHandler());
});

// use the :name parameter, as the value column, 
// similar to the .use(), and placement is significant,
// ie calling something with :name will not trigger the generic app.use(fn),
// as the control starts here and ends at the .get('/n/:name'), but placing 
// the use after this will always call it
app.param('name',function(req,res,next,val){
	console.log(val);
	next();
});


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/n/:name',function(req,res){
	res.redirect('/');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
