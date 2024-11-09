// Handles the GET request for the home page
// Checks if the user is logged in by looking for 'userID' in the session
// If logged in, it renders the 'home' page with the user's name from the session
// If not logged in, it renders the 'home' page without user-specific information
exports.getHome = (req, res, next) => {
  console.log(req.sessionID);
  if (req.session.userID) {
    res.status(200).render('home', { content: '_empty', userName: req.session.userName });
  } else {
    res.status(200).render('home', { content: '_empty' });
  }
};

// Handles the GET request for the login page
// Renders the login form (content: '_loginForm')
exports.getLogIn = (req, res, next) => {
  console.log(req.session);
  res.status(200).render('home', { content: '_loginForm' });
};

// Handles the GET request for the sign-up page
// Renders the sign-up form (content: '_signupForm')
exports.getSignUp = (req, res, next) => {
  res.status(200).render('home', { content: '_signupForm' });
};
