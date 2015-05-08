var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;



var Signup = React.createClass({

  render: function() {
    return (
        <div id="signup">
          <p> This is the SIGNUP react component</p>
                  
          <TextField hintText="cell phone " floatingLabelText="cell phone" />
          <TextField hintText="email" floatingLabelText="email" />
          <TextField hintText="password" floatingLabelText="Password" />
        </div>
    );
  }
});

module.exports = Signup;