const socket = io();
const pubContainer = document.getElementById('pubContainer');
const publicForm = document.querySelector('#publicForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const tags = document.querySelector('#tags');
publicForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('title :>> ', title.value, description.value, tags.value);
  socket.emit('client:newpublication', {
    title: title.value,
    description: description.value,
    tags: tags.value,
  });
});
socket.on('server:publications', (publications) => {
  console.log(publications);
  publications.forEach((publication) => {
    pubContainer.innerHTML += `
    <div class= "card" style = "margin-top: 2vh;" >
      <div class="card-header" style="display: flex; justify-content: space-between;">
        <div>
          <h5>to ${publication.tags} team</h5>
        </div>
        <div class="">
          ${publication.createdAt}
          ${publication.createdAt}
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          ${publication.title}
        </h5>
        <p class="card-text">
          ${publication.description}
        </p>
      </div>
      </div>

    `;
  });
});

socket.on('server:newpublication', (publication) => {
  pubContainer.innerHTML =
    `
    <div>
    <div class= "card" style = "margin-top: 2vh;" >
      <div class="card-header" style="display: flex; justify-content: space-between;">
        <div>
          <h5>to ${publication.tags} team</h5>
        </div>
        <div class="">
          ${publication.createdAt}
          ${publication.createdAt}
        </div>
      </div>
      <div class="card-body">
        <h5 class="card-title">
          ${publication.title}
        </h5>
        <p class="card-text">
          ${publication.description}
        </p>
      </div>
      </div>
    ` + pubContainer.innerHTML;
});
