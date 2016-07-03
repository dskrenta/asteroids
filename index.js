var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('assets'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.emit('socketId', {id: socket.id});
  socket.on('position', function(position) {
    console.log(`socketId: ${position.id}, xPosition: ${position.x}, yPosition: ${position.y}`);
    socket.broadcast.emit('position update', position);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
