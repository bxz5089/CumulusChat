const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const http = require('http');

// const helpers = require('./utils/helpers');

const app = express();
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);



const users = {}

// io.on('connection', socket => {
//   socket.on('new-user', name => {
//     users[socket.id] = name
//     socket.broadcast.emit('user-connected', name)
//   });
// });

// socket.on('send-chat-message', message => {
//   socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] })
// });
// socket.on('disconnect', () => {
//   socket.broadcast.emit('user-disconnected', users[socket.id])
//   delete users[socket.id]
// });



// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({});

const sess = {
  secret: 'Super secret secret',
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
  server.listen(PORT, () => console.log('Now listening'));
});