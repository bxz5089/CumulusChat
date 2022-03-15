const path = require('path');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helper');
const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

//socket.io test
// const socket = require('socket.io');
// const io = socket(server);
//


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

const users = {};

// io.on('connection', socket => {
//   socket.on('new-user', name => {
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   });
// });

// let socket = io.connect('http://localhost');

// socket.on('send-chat-message', message => {
//   socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
// });
// socket.on('disconnect', () => {
//   socket.broadcast.emit('user-disconnected', users[socket.id])
//   delete users[socket.id]
// });

//socket.io test
// io.on('connection', (socket) => {
//   console.log('Socket connected', socket.id);

//   // Handle chat event
//   socket.on('chat', function(data) {
//     console.log(data);
//     io.sockets.emit('chat', data);
//   });
// });//
const hbs = exphbs.create({ helpers });

const sess = {
  secret: process.env.SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening at http://localhost:3001/'));
});