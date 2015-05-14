/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react'),
    mui = require('material-ui'),

    Toolbar = mui.Toolbar,
    ToolbarGroup = mui.ToolbarGroup,
    DropDownMenu = mui.DropDownMenu,
    LeftNav = mui.LeftNav,
    RightNav = mui.RightNav,
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.RaisedButton;
    
/** Declare all components here **/
var Hamburger = require('./Hamburger.jsx');


  var Navigation = React.createClass({

    getInitialState: function() {
    return {
      
    };
  },

  render: function() {
    return (
        <div id="navigation">
          <Toolbar>
           <Hamburger />
            <ToolbarGroup key={0} float="left">
            <h1> highway || </h1>
          </ToolbarGroup>

          <ToolbarGroup key={1} float="right">
            <RaisedButton label="signup" primary={true} linkButton={true} href="/signup" onTouchTap={this._handleSignupTouchTap} />
            <RaisedButton label="login" primary={true} linkButton={true} href="/login" onTouchTap={this._handleLoginTouchTap} />

          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }
});

module.exports = Navigation;
