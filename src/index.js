import { app, server } from './app.js';
// start server
server.listen(app.get('port'), () =>
  console.log(`App listening on port ${app.get('port')}!`)
);
