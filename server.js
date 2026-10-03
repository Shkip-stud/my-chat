const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('Кто-то зашёл в чат!');

  // Теперь принимаем объект с именем и текстом
  socket.on('chat message', (data) => {
    io.emit('chat message', data);
  });

  socket.on('disconnect', () => {
    console.log('Кто-то вышел из чата');
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен: http://localhost:3000');
});