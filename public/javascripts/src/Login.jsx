var React = require('react');
var mui = require('material-ui');


var Login = React.createClass({

  render: function() {
    return (
        <div id="login">
        <p> This is the LOGIN react component</p>

        <p> You are logged in as: {{ }} </p>

        <form action="login" method="post">
          <div>
            <label for="username">Email: {{ }} </label>
            <input type="text" name="username" id="username"/>
          </div>
          
          <div>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password"/>
          </div>
        
          <div>
            <input type="submit" value="Log in"/>
          </div>
        </form>

      </div>
    );
  }
});

module.exports = Login;