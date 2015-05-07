var r = require('rethinkdb')
  , util = require('util')
  , assert = require('assert')
  , logdebug = require('debug') ('rdb:debug')
  , logerror = require('debug') ('rdb:error');


// RethinkDB database settings. Defaults can be overridden using environment variables.
var db = {
    host: process.env.RDB_HOST || 'localhost',
    port: process.env.RDB_PORT || 28015,
    db: process.env.RDB_DB || 'highway',
    tables: {
        'messages': 'id', 
        'cache': 'cid',
        'users': 'id'
    }
  };


r.connect({ host: 'localhost', port: 28015}, function (err, conn) {
    if (err) throw err;
    /* r.db('test').tableCreate('users').run (conn, function (err, res) {
        if (err) throw err;
        console.log(res);

        r.table('users').insert({ name: 'test user name'}).run (conn, function (err, res)
        {
            if (err) throw err;
            console.log(res);
        });
    });
    */
});

module.exports = db;