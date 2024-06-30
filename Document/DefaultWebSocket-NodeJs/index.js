const app = require('./app');
const PORT = process.env.PORT || 8000;
const socketIo = require('socket.io');
// 1 ) Websocket Requirement
const WebSocket = require('ws');

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// 2 ) WebSocket Http Server

const wss = new WebSocket.Server({ server });

// 3 ) WebSocket Connected
wss.on('connection', (webSocket, req) => {
  console.log('WebSocket connected');
  console.log('Request headers:', req.headers);

  webSocket.on('message', (message) => {
    console.log(`Received message: ${message.toString()}`);
  });

  webSocket.send('hi from server');

  webSocket.on('close', () => {
    console.log('WebSocket disconnected');
  });
});
