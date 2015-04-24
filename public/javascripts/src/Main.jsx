/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react');
var mui = require('material-ui');

/** Declare all components here **/
/*
var Navigation = require('./Navigation.jsx');
var Search = require('./Search.jsx');
var UserProfile = require('./UserProfile.jsx');
var UserFeed = require('./UserFeed.jsx');
*/    

var Main = React.createClass({

  render: function() {
    return (
        <div id="main-container">
          
          <p> this is the main-container form react.js, boom! </p>

      </div>
    );
  }
});

module.exports = Main;
