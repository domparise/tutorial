var express = require('express');
var app = express(),
	rand;

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));

// 'middleware' to set a new random value each time
app.use(function(req,res,next){
	rand = Math.random();
	next();
});

app.get('/',function(req,res){
	res.sendfile('public/index.html');
});

app.get('/someUrl',function(req,res){
	res.send({type:'get',val:rand});
});

app.post('/someUrl',function(req,res){
	res.send({type:'post',val:rand});
});

app.listen(8688);
console.log('listening on 8688');