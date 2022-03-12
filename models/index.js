const User = require('./User');
const Chat = require('./Chat');

//create socket on server side

User.hasMany(Chat, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Chat.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Chat };
