var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
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


io.on('connection', function(socket){
  // A user connected
  console.log('IN');
  socket.on('disconnect', function(){
    // A user disconnected
    console.log('OUT');
  });

  socket.on('send message', function(msg){
    if(msg.message !== ''){
      console.log(msg.author);
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