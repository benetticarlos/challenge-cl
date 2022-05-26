import express from 'express';
const router = express.Router();
import helpers from '../helpers/auth.js';
import passport from 'passport';
import {
  getSigninView,
  getSignUnView,
  signUnForm,
  logOut,
  editProfile,
  profileView,
} from '../controllers/users.controller.js';

router.get('/signin', getSigninView);

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/signin',
    failureFlash: true,
  })
);

router.get('/signup', getSignUnView);

router.post('/signup', signUnForm);

router.get('/logout', helpers.isAuthenticated, logOut);

router.post('/profile/:id', helpers.isAuthenticated, editProfile);

router.get('/profile', helpers.isAuthenticated, profileView);

export default router;
