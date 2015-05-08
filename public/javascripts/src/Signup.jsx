var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;



var Signup = React.createClass({

  render: function() {
    return (
        <div id="signup">
        <p> This is the SIGNUP react component</p>        

        <form action="login" method="post">
          


          <div>
            <label for="username">Email:</label>
            <input type="text" name="username" id="username"/>
          </div>
          
          <div>
            <label for="password">Password:</label>
            <input type="password" name="password" id="password"/>
          </div>
        
          <div>
            <input type="submit" value="Sign Up" />
          </div>



        </form>


      </div>
    );
  }
});

module.exports = Signup;