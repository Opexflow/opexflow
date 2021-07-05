var chatIO = require('socket.io');
var io = null;

exports.io = function () {
  return io;
};

exports.initialize = function(http) {
  return io = chatIO(http, {
    path: '/api/socket/chat',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
  
};