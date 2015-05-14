var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField
  , FlatButton = mui.FlatButton
  , FontIcon = mui.FontIcon;




var Signup = React.createClass({

  render: function() {
    return (
        <div id="signup-container">
          <div className ="signup-phone">
            <TextField hintText="cell phone " floatingLabelText="cell phone" />
          </div>
          
          <div className ="signup-email">
            <TextField hintText="email" floatingLabelText="email" />
          </div>
          <div className ="signup-password">
            <TextField hintText="password" floatingLabelText="Password" />
          </div>

          <div className="signup-button-container">
            <FlatButton linkButton={true} href="/signup" secondary={true}>
              <FontIcon className="muidocs-icon-custom-github"/>
                <span className="mui-flat-button-label">Signup</span>
            </FlatButton>
          </div>

        </div>
    );
  }
});

module.exports = Signup;