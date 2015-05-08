var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;


var Login = React.createClass({

  render: function() {
    return (
        <div id="login">
          <p> This is the LOGIN react component</p>
          <p> You are logged in as: {{ }} </p>

          <TextField hintText="email" floatingLabelText="email" />
          <TextField hintText="password" floatingLabelText="Password" />
          
        </div>
    );
  }
});

module.exports = Login;