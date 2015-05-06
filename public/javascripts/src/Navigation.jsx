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

  render: function() {
    return (
        <div id="navigation">
          <Toolbar>
           <Hamburger />
            <ToolbarGroup key={0} float="left">
            <h1> highway || </h1>
          </ToolbarGroup>

          <ToolbarGroup key={1} float="right">
            <RaisedButton label="sign up" primary={true} onTouchTap={this._handleTouchTap} />
            <RaisedButton label="log in" primary={true} onTouchTap={this._handleTouchTap} />

          </ToolbarGroup>
        </Toolbar>
      </div>
    );
  }

});

module.exports = Navigation;
