var express = require('express');
var socket = require('socket.io');

// App setup
var PORT = process.env.PORT || 3000;

var app = express();
var server = app.listen(PORT, function() {
    console.log("Listening to requests on" + PORT);
});

// Static files

app.use(express.static('public'));

// Socket setup

var io = socket(server);

io.on('connection', function(socket) {
    socket.join('some room');
    console.log(socket.id);

    socket.on('chat', function(data) {
        io.to("some room").emit('chat', data);
    });

    socket.on('typing', function(data) {
        socket.broadcast.emit('typing', data);
    });
})