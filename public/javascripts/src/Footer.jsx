/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react');
var mui = require('material-ui');


var Footer = React.createClass({

  render: function() {
    return (
        <div id="footer">
        <p> This is the footer react component</p>


      </div>
    );
  }
});

module.exports = Footer;
