var express = require('express');
var server = express();

server.use(express.static('public'));

server.get('/',function(req,res){
	res.sendfile('public/index.html');
});

server.listen(8688);
console.log('listening on 8688');