const User = require('./User');
const Chat = require('./Chat');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


User.hasMany(Chat, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Chat.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Chat };
