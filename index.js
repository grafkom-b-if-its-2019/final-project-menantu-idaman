var express = require('express');
var socket =  require('socket.io');

// App Setup
var app = express();
var port = process.env.PORT || 3000;
var path = require('path');
var server = require('http').createServer(app);
var io = socket(server);

server.listen(port,() => {  console.log('listening request on port ' + port);   });

// Routing
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log("someone connected " + socket.id);
    socket.on("direction", (msg) => {
        socket.broadcast.emit("dir", msg);
        console.log("dir: " + msg);
    });
});