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

// 1) Send To All Clients
io.of('/').on('connection', (socket) => {
  socket.on('newMessageToServer', ({ text, username, id, roomJoinId }) => {
    socket.join(roomJoinId);
    io.of('/')
      .to(roomJoinId)
      .emit(
        'joined',
        `${socket.id} says i have joined the room ${roomJoinId} `
      );
    io.emit('newMessageFromServer', {
      serverMessage: 'the message accept from backend',
      clientMessage: text,
      username,
      id,
    });
  });
});

// 2 ) Send To Admin Client

io.of('/admin').on('connection', (socket) => {
  io.of('/admin').to('room1').emit('welcome', 'welcome to the admin channel!');
});
