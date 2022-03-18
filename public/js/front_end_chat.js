//socket chat connection
const socket = io();

const message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
  socket.emit('chat', {
    username: socket.id,
    message: message.value,
  });
  message.value = '';
});

socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});
