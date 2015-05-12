var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '|| highway' });
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login TEST' });
});


module.exports = router;
