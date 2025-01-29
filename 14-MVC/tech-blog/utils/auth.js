module.exports = {
  // Middleware to check if a user is logged in
  withAuth: (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      next();
    }
  }
};