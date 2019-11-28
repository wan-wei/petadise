// var randomstring = require('randomstring');
// var petInfo = require('../datas/pet-info');
var socket_io = require('socket.io');
var prepareTask = require('./gameCore').preparTask;


var socketIo = {};

socketIo.getSocketIo = function(server) { // http(s) server
  var io = socket_io.listen(server);
  io.sockets.on('connection', function (socket) {
    console.log('has a new connection!');
    // console.log("a")
    // setTimeout(func, 5000, socket);
    // // socket.emit('taskAlert', {type: "feed"})
    // console.log("b")

    socket.on('prepare_tasks', function (data) {
      prepareTask(socket, data.uniqueId, data.petName);
    });

    socket.on('disconnect', function (data) {
      console.log('has a new disconnection!', data);
    });
  });
};

module.exports = socketIo;