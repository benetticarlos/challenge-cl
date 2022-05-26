import express from 'express';
import session from 'express-session';
import path from 'path';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import passport from 'passport';
import flash from 'connect-flash';

import indexRoutes from './routes/index.routes.js';
import notificationsRoutes from './routes/notifications.routes.js';
import userRoutes from './routes/users.routes.js';
import publicationsRoutes from './routes/publications.routes.js';

import addAdmin from './helpers/addAdmin.js';
import config from './config/config.js';

import mongoose from './database.js';
import './config/passport.js';

const __filename = path.resolve(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

// initialize the express app
const app = express();
addAdmin();

// settings
app.set('trust proxy', 1);
app.set('port', config.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: config.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

// routes
app.use('/', indexRoutes);
app.use('/notifications', notificationsRoutes);
app.use('/users', userRoutes);
app.use('/publications', publicationsRoutes);

// static files
app.use(express.static(path.join(__dirname + '/public')));

// start server
app.listen(app.get('port'), () =>
  console.log(`App listening on port ${app.get('port')}!`)
);
