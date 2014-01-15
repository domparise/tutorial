var express = require('express'),
	db = require('./db.js');
var server = express();

server.use(express.static('public'));

server.use(function(req,res,next){
	var Model = db.newModel('basic',{
		name:String,
		num:Number
	});
	var model = new Model({name:'name',num:3});
	model.save(function(err){
		if(err) console.log(err);
	});
	console.log(Model.find());
});

server.get('/',function(req,res){
	res.sendfile('public/index.html');
});



server.listen(8000);
console.log('listening on 8000');