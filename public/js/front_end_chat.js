//socket.io test
const socket = io();

socket.on('message', message => {
  console.log(message);
});

// const message = document.getElementById('message'),
//   btn = document.getElementById('send'),
//   output = document.getElementById('output'),
//   feedback = document.getElementById('feedback');

// btn.addEventListener('click', function() {
//   socket.emit('chat', {
//     message: message.value,
//   });
//   message.value = '';

 
// });

// socket.on('connection', io => {
//   console.log('New ws connection...');
// });
// ('chat', function(data) {
//   feedback.innerHTML = '';
//   output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
// });

// message.addEventListener('keypress', function () {
//   socket.emit('typing', handle.value);
// });