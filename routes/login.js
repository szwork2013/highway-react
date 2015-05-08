var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login TEST' });
});

module.exports = router;
