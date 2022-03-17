//socket.io test
const socket = io();

const message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

//Message submit
btn.addEventListener('click', function() {
  socket.emit('chat', {
    message: message.value,
  });
  message.value = '';
});

socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});




