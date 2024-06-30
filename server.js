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
    methods: ['GET', 'POST'],
  },
});

// 5 ) Socket Io Connection
io.on('connection', (socket) => {
  console.log(`User Logger ${Math.floor(Math.random() * 23 * 12)}`);
  socket.emit('welcome', 'accpet message');
});
