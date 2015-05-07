 var passport = require('passport')
   , local = require('passport-local').Strategy
   , bcrypt = require ('bcrypt')
   , db = require ('./config/db')
   , util = require('util');



passport.use(new local(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var validateUser = function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, {message: 'Unknown user: ' + username})}

        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user);
        }
        else {
          return done(null, false, {message: 'Invalid username or password'});
        }
      };

      db.findUserByEmail(username, validateUser);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("[DEBUG][passport][serializeUser] %j", user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  db.findUserById(id, done);
});