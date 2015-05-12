var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;


var Login = React.createClass({

  render: function() {
    

    return (
        <div id="login-container">
          <div className ="login-email">
            <TextField hintText="email" floatingLabelText="email" />
          </div>

          <div className ="login-password">
            <TextField hintText="password" floatingLabelText="Password" />
          </div>


          
          <div className="forgot-password">
            <p> Did you forget your password again?!  You are logged in as: {{ }}</p>
          </div>
        </div>
    );
  }
});

module.exports = Login;