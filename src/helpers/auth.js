import User from '../models/user.js';

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You must be logged in to do that');
  res.redirect('/users/signin');
};

// helpers.isAdmin = (req, res, next) => {
//   if (req.user.isAdmin === true) {
//     return next();
//   } else {
//     return false;
//   }
// };

export default helpers;
