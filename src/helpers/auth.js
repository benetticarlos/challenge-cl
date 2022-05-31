const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'You must be logged in to do that');
  res.redirect('/users/signin');
};

export default isAuthenticated;
