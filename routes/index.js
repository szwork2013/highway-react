var express = require('express')
  , bcrypt = require ('bcrypt')
  , router = express.Router()
  , session = require('express-session')
  , passport = require('passport')
  , local = require('passport-local').Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , r = require('rethinkdb')
  , db = require('../config/database');


function checkIfLoggedIn (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};


function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

function validateEmail (email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}


/* GET home page. */
router.get('/', function(req, res, next) {
   if (typeof req.user == 'undefined') {
    req.user = false;
  }
  res.render('index', { title: '|| highway', user: req.user });
});

/* SET sessions with redis*/
/* GET sessions with redis*/

/* GET login page. */
router.get('/login', function (req, res) {
  if (typeof req.user !== 'undefined') {
    // User is logged in.
    res.redirect('/account	');
  }
  else {
    req.user = false;
  }
  var message = req.flash('error');
  if (message.length < 1) {
    message = false;
  }
  res.render('index', { title: 'Login', message: message, user: req.user });
});


/* POST login page. */
router.post('/login',
  passport.authenticate('local', { successRedirect: './account', failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/account');
  }
);


/* GET signup page. */
router.get('/signup', function(req, res){
  if (typeof req.user !== 'undefined') {
    // User is logged in.
    res.redirect('/account');
  }
  else {
    req.user = false;
  }
  var message = req.flash('error');
  if (message.length < 1) {
    message = false;
  }
  res.render('index', { title: 'signup', message: message, user: req.user });
});


/* POST signup page. */
router.post('/signup', function(req, res){
  if (typeof req.user !== 'undefined') {
    // User is logged in.
    res.redirect('/account');
    return;
  }
  if (!validateEmail(req.param('email'))) {
    // Probably not a good email address.
    req.flash('error', 'Not a valid email address!')
    res.redirect('/signup');
    return;
  }
  if (req.param('password') !== req.param('password2')) {
    // 2 different passwords!
    req.flash('error', 'Passwords does not match!')
    res.redirect('/signup');
    return;
  }

  // Saving the new user to DB
  db.saveUser({
      username: req.param('username'),
      mail: req.param('email'),
      password: bcrypt.hashSync(req.param('password'), 8)
    },
    function(err, saved) {
      console.log("[DEBUG][/signup][saveUser] %s", saved);
      if(err) {
        req.flash('error', 'There was an error creating the account. Please try again later');
        res.redirect('/signup');
        return
      }
      if(saved) {
        console.log("[DEBUG][/signup][saveUser] /chat");
        res.redirect('/account');
      }
      else {
        req.flash('error', 'The account wasn\'t created');
        res.redirect('/signup');
        console.log("[DEBUG][/signup][saveUser] /signup");
      }
      return      
    }
  );
});


/* GET account page. */
router.get('/account', ensureAuthenticated, function(req, res) {
  res.render('index', { user: req.user, title: 'My account' });
});


/* GET logout page. */
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

/*
** Helper Methods
*/


module.exports = router;