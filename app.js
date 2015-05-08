var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , flash = require('connect-flash')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , local = require('passport-local').Strategy
  , bcrypt = require ('bcrypt')
  , secrets = require('./config/secrets')
  , util = require('util')
  , session = require('express-session')
  , r = require('rethinkdb');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// db config
var db = require('./config/database');
db.setup();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false, 
                  cookie: {secure: true} 
}));

app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// passport config
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
  r
    .table('users')
    .get(id)
    .run(r.conn)
    .then(function (user){
      done (null, user);
    });
  });


var loginCallbackHandler = function (objectMapper, type) {
  return function (accessToken, refreshToken, profile, done) {
    if (accessToken !== null) {
      r
        .table('users')
        .getAll(profile.username, { index: 'login' })
        .filter({ type: type })
        .run(r.conn)
        .then(function (cursor) {
          return cursor.toArray()
            .then(function (users) {
              if (users.length > 0) {
                return done(null, users[0]);
              }
              return r.table('users')
                .insert(objectMapper(profile))
                .run(r.conn)
                .then(function (response) {
                  return r.table('users')
                    .get(response.generated_keys[0])
                    .run(r.conn);
                })
                .then(function (newUser) {
                  done(null, newUser);
                });
            });
        })
        .catch(function (err) {
          console.log('Error Getting User', err);
        });
    }
  };
};


passport.checkIfLoggedIn = function (req, res, next) {
  if (req.user) {
    return next();
  }
  return res.status(401).send('You\'re not logged in');
};


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}



/*
** Routes
*/

app.use('/', routes);
// app.get('/users', routes.users);
// app.get('/login', routes.login);


app.post('/signup', function(req, res){
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
        res.redirect('/contacts');
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



app.get('/login', function (req, res) {
  if (typeof req.user !== 'undefined') {
    // User is logged in.
    res.redirect('/chat');
  }
  else {
    req.user = false;
  }
  var message = req.flash('error');
  if (message.length < 1) {
    message = false;
  }
  res.render('login', { title: 'Login', message: message, user: req.user });
});

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res) {
    res.redirect('/contacts');
  }
);



/*
** Error Handlers
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
