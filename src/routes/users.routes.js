import express from 'express';
const router = express.Router();
import isAuthenticated from '../helpers/auth.js';
import passport from 'passport';
import {
  getSigninView,
  getSignUpView,
  signUpForm,
  logOut,
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

router.get('/signup', getSignUpView);

router.post('/signup', signUpForm);

router.get('/logout', isAuthenticated, logOut);

router.get('/profile', isAuthenticated, profileView);

export default router;
