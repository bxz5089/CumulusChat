// const User = require('./userChat');
// const Chat = require('./Chat');


//create socket on server side
const { appendUser, deleteUser, obtainUser, putUsersInRoom } = require('./userChat');

io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = appendUser({ id: socket.id, name, room });

    if(error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit('roomData', { room: user.room, users: putUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = appendUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    const user = deleteUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: putUsersInRoom(user.room)});
    }
  });
});


// User.hasMany(Chat, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE',
// });

// Chat.belongsTo(User, {
//   foreignKey: 'user_id',
// });

// module.exports = { User, Chat };


