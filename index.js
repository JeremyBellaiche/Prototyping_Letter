var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function inArray(needle, haystack) {
    var length = haystack.length;
    for(var i = 0; i < length; i++) {
        if(typeof haystack[i] == 'object') {
            if(arrayCompare(haystack[i], needle)) return true;
        } else {
            if(haystack[i] == needle) return true;
        }
    }
    return false;
}

function findById(source, id) {
  for (var i = 0; i < source.length; i++) {
    if (source[i].id === id) {
      return source[i];
    }
  }
  throw "Couldn't find object with id: " + id;
}

var users = [];

io.on('connection', function(socket){
  // A user connected
  users.push(socket);

  socket.on('register', function(username){
    io.emit('register', username);
  });

  socket.on('disconnected', function(username){
    io.emit('disconnected', username);
  })

  socket.on('disconnect', function(username){
    // A user disconnected
    var i = users.indexOf(socket);
    users.splice(i, 1);
  });

  socket.on('send message', function(msg){
    if(msg.message !== ''){
      io.emit('send message', msg);
    }
  })

  socket.on('write message', function(msg){
    io.emit('write message', msg);
  })

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});