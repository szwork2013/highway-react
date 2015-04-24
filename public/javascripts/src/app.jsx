var React = require('react');
var mui = require('material-ui');

injectTapEventPlugin = require("react-tap-event-plugin");
var Main = require('./Main.jsx');


//Needed for React Developer Tools
   window.React = React;


  //Needed for onTouchTap
  //Can go away when react 1.0 release
  //Check this repo:
  //https://github.com/zilverline/react-tap-event-plugin
     injectTapEventPlugin();

React.render(
  <Main/>,
  document.getElementById('main-container')
);
