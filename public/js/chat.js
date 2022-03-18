//socket chat connection
const username = document.querySelector('#name-signup');
const socket = io();

const message = document.getElementById('message'),
  btn = document.getElementById('send'),
  output = document.getElementById('output'),
  feedback = document.getElementById('feedback');

btn.addEventListener('click', function() {
  socket.emit('chat', {
    username: document.getElementById('usernameio').innerHTML,
    message: message.value,
  });
  message.value = '';
});

socket.on('chat', function(data) {
  feedback.innerHTML = '';
  output.innerHTML += '<p class="innerBox" ><strong class="messageUsername">' + data.username + ': </strong>' + data.message + '</p>';
});

