var express = require('express'),
    app = express(),
    redis = require('redis'),
    client = redis.createClient(),
    http = require('http'),
    server = require('http').createServer(app),
    socket = require('socket.io').listen(server),
    amqp = require('amqp');

    console.log("listening on 3065");
    server.listen(3065);

    app.configure(function(){
        app.set('port', process.env.PORT || 3000);
        app.set('views', __dirname + '/views');
        app.set('view engine', 'jade');
        app.use(express.bodyParser());
    });

    app.connectionStatus = 'No server connection';
    app.exchangeStatus = 'No exchange established';
    app.queueStatus = 'No queue established';

    app.get('/', function(req, res){
        res.render('rpubsub', {
            title: 'redis pubsub with amqp',
            connectionStatus: app.connectionStatus,
            exchangeStatus: app.exchangeStatus,
            queueStatus: app.queueStatus
        });
    });

    app.post('/start-server', function(req, res){
        app.rabbitMqConnection = amqp.createConnection({ host: '0.0.0.0' });
        app.rabbitMqConnection.on('ready', function(){
            app.connectionStatus = 'Connected!';
            res.redirect('/');
        });
    });

    app.post('/new-exchange', function(req, res){
        app.e = app.rabbitMqConnection.exchange('test-exchange');
        app.exchangeStatus = 'ready';
        res.redirect('/');
    });

    app.post('/new-queue', function(req, res){
        app.q = app.rabbitMqConnection.queue('test-queue');
        app.queueStatus = 'ready';
        res.redirect('/');
    });

    app.get('/message-service', function(req, res){
        app.q.bind(app.e, '#');
        res.render('message-service', {
            title: 'Welcome to the messaging service',
            sentMessage: ''
        });
    });

    app.post('/newMessage', function(req, res){
        var newMessage = req.body.newMessage;
        console.log('received '+newMessage);
        app.e.publish('routingKey', { message: newMessage });
        app.q.subscribe(function(msg){
            console.log('returning msg '+msg);
            res.render('message-service', {
                title: 'You\'ve got mail!',
                sentMessage: msg.message
            });
        });
    });

    app.get('/message-return', function(req,res){
        app.q.subscribe(function(msg){
            console.log('returning msg '+msg);
            res.render('message-return', {
                title: 'You\'ve got mail!',
                sentMessage: msg.message
            });
        });
    });

    socket.on('connection', function(client) {
        var subscribe = redis.createClient();
        subscribe.subscribe('pubsub'); //    listen to messages from channel pubsub

        subscribe.on("message", function(channel, message) {
            client.send(message);
        });

        client.on('message', function(msg) {
        });

        client.on('disconnect', function() {
            subscribe.quit();
        });
    });
