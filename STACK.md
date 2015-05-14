#Tech Stack

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
    /*
     r.db('test').tableCreate('users').run (conn, function (err, res) {
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


/*
var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;

var Message = React.createClass({

  getInitialState: function (){
    return {value: ''};
  },

  handleChange: function(){
    this.setState({ value: event.target.value});
  },

  handleSubmit: function(e){
    e.preventDefault();

    var text = this.state.value;
    console.log('This is the message value' + text);
    this.props.socket.emit('message', {
      message: text,
      userName: userName
    });

    this.state.value = '';
  },
*/

/*
  render: function() {
    var value = this.state.value;

    return (
        <div id ="message-container">
        <form id="message-form" >
          <input type='submit' className="message-button" onSubmit={this.handleSubmit} />
          <input type='text' className="form-control" value={value} onChange={this.handleChange} placeholder='Your Message Here' />
        </form>

        <TextField hintText="Hint Text" floatingLabelText="Floating Label Text"
         valueLink={this.value} onSubmit={this.handleSubmit} />
        </div>
    );
  }
});

module.exports = Message;

*/

#message-container{
  width: 75%;
  height: 100px;
  background: orange;
  margin: auto;
}


/*
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
*/





    <div class="login-email"></div>
    <div class="login-password"></div>
    <div class="forgot-pasword"></div>
    <div class="login-button-container"></div>


    