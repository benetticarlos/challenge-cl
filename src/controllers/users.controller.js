import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import passport from 'passport';

export const getUsers = async (req, res) => {
  res.render('pages/signin');
};

export const signin = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true,
});
