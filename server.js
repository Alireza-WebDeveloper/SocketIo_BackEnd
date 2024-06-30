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
});

// 5 ) Socket Io Connection
io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'welcome to the socketIo server' });
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient.data);
  });
});
