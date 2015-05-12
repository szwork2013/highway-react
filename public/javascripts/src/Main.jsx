/** We create our React entry-point component, it incorporates all other react components */
var React = require('react');
var mui = require('material-ui');

/** Declare all components here **/
var Navigation = require('./Navigation.jsx');
var Signup = require('./Signup.jsx');
var Login = require('./Login.jsx');
var Contacts = require('./Contacts.jsx');
var Content = require('./Content.jsx');
var Footer = require('./Footer.jsx');

/* 
var Search = require('./Search.jsx');
var UserProfile = require('./UserProfile.jsx');
var UserFeed = require('./UserFeed.jsx');
*/    

var Main = React.createClass({

  render: function() {
    return (
      <div id="main-container"> 
        < Navigation />
        < Signup />
        < Login />
        < Contacts />
        < Content />
        < Footer />

      </div>
    );
  }
});

module.exports = Main;
