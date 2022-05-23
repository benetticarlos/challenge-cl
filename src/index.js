import express from 'express';
import path from 'path';
import morgan from 'morgan';
import router from './routes/index.routes.js';
import { fileURLToPath } from 'url';
import mongoose from './database.js';

const __filename = path.resolve(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

// initialize the express app
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

// global variables

// routes
app.use('/api/notifications', router);

// static files
app.use(express.static(path.join(__dirname + '/public')));
// start server

app.listen(app.get('port'), () =>
  console.log(`Example app listening on port ${app.get('port')}!`)
);
