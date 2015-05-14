var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , flash = require('connect-flash')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , config = require('config')
  , bcrypt = require ('bcrypt')
  , secrets = require('./config/secrets')
  , util = require('util')
  , passport = require('passport')
  , local = require('passport-local').Strategy
  , GitHubStrategy = require('passport-github').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , session = require('express-session')
  , redis = require('redis')
  , client = redis.createClient()
  , RedisStore = require('connect-redis')(session)
  , r = require('rethinkdb');


var routes = require('./routes/index');
var app = express();


// db config
var db = require('./config/database');
db.setup();

 client.on("error", function (err) {
        console.log("Error " + err);
    });

// view engine setup and express middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser('redis-secret'));
app.use(session({
  secret: "redis-secret", 
  saveUninitialized: false,
  resave: false,
  store : new RedisStore({ 
    host : 'localhost', 
    port : '6379', 
    user : '', 
    // pass : 'redistogo-password' only, redis-server does not require
  }), // redis://redistogo:9d54b42583fe351e819913094b8bf708@grideye.redistogo.com redis host, port '9284' 
  cookie : {
    secure: true,
    maxAge : 604800 // one week, 604800 seconds
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(require('less-middleware')(path.join(__dirname, 'public')));


/*
/* passport config
*/
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


/*
** Routes
*/
app.use('/', routes);


/*
** Error Handlers
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


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
