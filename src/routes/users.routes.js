import express from 'express';
const router = express.Router();
import isAuthenticated from '../helpers/auth.js';
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

router.get('/logout', isAuthenticated, logOut);

router.post('/profile/:id', isAuthenticated, editProfile);

router.get('/profile', isAuthenticated, profileView);

export default router;
