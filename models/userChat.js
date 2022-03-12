const { doc } = require("prettier")

const users = [];

const appendUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const currentUser = users.find((user) => user.room === room && user.name === name);

  if(!name || !room) 
  return { error: 'Room and Username are required.' };

  if(currentUser) 
  return { error: 'This username is taken.' };

  const user = { id, name, room };

  users.push(user);

  return { user };
}

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const obtainUser = (id) => users.find((user) => user.id === id);

const putUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { appendUser, deleteUser, obtainUser, putUsersInRoom };