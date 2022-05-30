const socket = io();

const profileForm = document.querySelector('#profileForm');

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('client:profileTeam', {
    subscriptions: subscriptions.value,
  });

  // socket.emit('client:notifications', { message: 'send' });
});
