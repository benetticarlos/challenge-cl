import User from '../models/user.js';
import addNotifications from '../helpers/subscriptions.js';

export const getSigninView = (req, res) => {
  res.render('pages/signin');
};
export const getSignUnView = (req, res) => {
  res.render('pages/signup');
};

export const signUnForm = async (req, res) => {
  const errors = [];
  const { name, email, password, confirm_password } = req.body;

  console.log('req.body :>> ', req.body);

  if (name.length <= 0) {
    errors.push({ text: 'Please write your name' });
  }
  if (email.length <= 0) {
    errors.push({ text: 'Please write your email' });
  }
  if (password.length <= 0) {
    errors.push({ text: 'Please write your password' });
  }
  if (password.length < 4) {
    errors.push({ text: 'Password must be at least 4 characters' });
  }
  if (password != confirm_password) {
    errors.push({ text: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    errors.map((error) => {
      req.flash('error_msg', error.text);
    });
    res.redirect('/users/signup');
  } else {
    const emailUser = await User.findOne({ email });
    if (emailUser) {
      req.flash('error_msg', 'The Email is already in use.');

      res.redirect('/users/signup');
    } else {
      const newUser = new User({ name, email, password });
      newUser.password = await newUser.encryptPassword(password);
      await newUser.save();

      console.log(newUser);
      res.redirect('/users/signin');
    }
  }
};

export const logOut = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};

export const profileView = async (req, res) => {
  const user = await User.findById(req.user._id);

  res.render('pages/profile', { user });
};

export const editProfile = async (req, res) => {
  const id = req.user.id;
  const { subscriptions } = req.body;
  if (id) {
    await User.findByIdAndUpdate(id, {
      subscriptions: subscriptions,
    });
    addNotifications(req.user);
    res.render('pages/profile', { user: req.user });
  }
};

export const getUsers = async (req, res) => {
  res.render('pages/signin');
};
