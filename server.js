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
  // !! 1 )  Receives Message From Client
  socket.on('newMessageToServer', ({ text, username, id, roomJoinId }) => {
    // !! 2 )  Send Message To All Clients
    io.of('/').emit('newMessageFromServer', {
      serverMessage: 'the message accept from backend',
      clientMessage: text,
      username,
      id,
    });
  });
});

const nameSpaces = ['/wiki', '/admin', '/rocket'];

io.on('connection', (socket) => {
  socket.emit('ns', nameSpaces);
});

// 2 ) Send To Admin Client

io.of('/admin').on('connection', (socket) => {
  io.of('/admin').to('room1').emit('welcome', 'welcome to the admin channel!');
});
