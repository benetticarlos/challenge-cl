import express from 'express';
import path from 'path';
import morgan from 'morgan';
import notificationsRoutes from './routes/notifications.routes.js';
import userRoutes from './routes/users.routes.js';
import { fileURLToPath } from 'url';
import session from 'express-session';
import mongoose from './database.js';
import passport from 'passport';
import flash from 'connect-flash';
import './config/passport.js';
import helpers from './helpers/auth.js';
import publicationsRouter from './routes/publications.routes.js';
import Publication from './models/publications.js';
import addAdmin from './helpers/addAdmin.js';
import config from './config/config.js';

const __filename = path.resolve(fileURLToPath(import.meta.url));
const __dirname = path.dirname(__filename);

// initialize the express app
const app = express();
addAdmin();

// settings
app.set('port', config.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(methodOverride('_method'));
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
app.use('/api/notifications', notificationsRoutes);
app.use('/users', userRoutes);
app.use('/publications', publicationsRouter);
app.post('/', (req, res) => {
  res.send('GET request to the homepage');
});
// app.get('/', (req, res) => {
//   res.render('pages/index');
// });
app.get('/', (req, res) => {
  res.render('pages/index');
});
app.get('/news', helpers.isAuthenticated, async (req, res) => {
  const publications = await Publication.find();
  const user = req.user;
  console.log('user :>> ', user);
  console.log('publications :>> ', publications);
  res.render('pages/publications', { publications });
});

// static files
app.use(express.static(path.join(__dirname + '/public')));
// start server

app.listen(app.get('port'), () =>
  console.log(`Example app listening on port ${app.get('port')}!`)
);
