const socket = io();
const notifContainer = document.getElementById('notifContainer');

socket.on('connect', () => {
  socket.emit('client:notifications', { message: 'send' });
});

socket.on('server:notifications', (notifications) => {
  notifications.forEach((notification) => {
    let divRead = '';
    if (notification.read) {
      divRead = '';
    } else {
      divRead = '"background-color: darkgrey;font-weight: bold;"';
    }

    notifContainer.innerHTML += `<div class="card" style="margin-top: 5vh;">
                  <div class="card-header" style="display: flex; justify-content: space-between;">
                    <div>
                      <h5>to ${notification.tags} team</h5>
                    </div>
                    <div class="">
                      ${notification.createdAt}
                      ${notification.createdAt}
                    </div>
                  </div>
                  <div class="card-body" style=${divRead}>
                                      <div class="card-body">
                            <h5 class="card-title">
                              ${notification.title}
                            </h5>
                            <p class="card-text">
                              ${notification.description}
                            </p>
                            <a href="/notifications/edit/${notification._id}">
                              <button type="button" class="btn btn-info">
                                Mark as read
                              </button>
                            </a>
                            <a href="/notifications/delete/${notification._id}">
                              <button type="button" class="delete btn btn-danger" data-id="${notification._id}">
                                Delete
                              </button>
                            </a>
                          </div>
                        </div>
                      </div>`;
  });
});
