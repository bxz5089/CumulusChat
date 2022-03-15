//socket.io test
// const socket = io.connect('http://localhost:3001');

// const message = document.getElementById('message'),
//   handle = document.getElementById('handle'),
//   btn = document.getElementById('send'),
//   output = document.getElementById('output'),
//   feedback = document.getElementById('feedback');

// btn.addEventListener('click', function() {
//   socket.emit('chat', {
//     message: message.value,
//     handle: handle.value
//   });
//   message.value = '';
// });

// socket.on('chat', function(data) {
//   feedback.innerHTML = '';
//   output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
// });

// message.addEventListener('keypress', function () {
//   socket.emit('typing', handle.value);
// });