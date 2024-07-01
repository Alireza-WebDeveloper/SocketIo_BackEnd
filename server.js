// 1 ) Requirement
const app = require('./app');
const PORT = process.env.PORT || 8000;
const { Server } = require('socket.io');

// 2 ) Server Connected
const server = app.listen(PORT, () => {
  console.log('Server Is Running Port 8000');
});

// 4 ) Variable Socket Io
const io = new Server(server, {
  cors: {
    origin: '*',
  },
  path: '/socket.io',
  serveClient: true,
  pingInterval: 10000,
  pingTimeout: 5000,
});

io.on('connect', (socket) => {
  socket.on('newMessageToServer', ({ text }) => {
    socket.emit('newMessageFromServer', {
      text: 'the message accept from backend',
    });
  });
});
