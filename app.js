var express = require('express')
  , path = require('path')
  , favicon = require('serve-favicon')
  , flash = require('connect-flash')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , passport = require('passport')
  , session = require('express-session')
  , r = require('rethinkdb');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// db config
var db = require('./config/database');
db.setup();

// passport config
var passport = require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(session({ secret: 'secret', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: {secure: true} 
                }));

/*
app.use(passport.initialize);
app.use(passport.session());
app.use(flash());
*/

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
// app.get('/users', routes.users);
// app.get('/login', routes.login);

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
