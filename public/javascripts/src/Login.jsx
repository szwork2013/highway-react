var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField
  , FlatButton = mui.FlatButton
  , FontIcon = mui.FontIcon;


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

          <div className="login-button-container">
            <FlatButton linkButton={true} href="/login" secondary={true}>
              <FontIcon className="muidocs-icon-custom-github"/>
                <span className="mui-flat-button-label">Login</span>
            </FlatButton>
          </div>

        </div>
    );
  }
});

module.exports = Login;