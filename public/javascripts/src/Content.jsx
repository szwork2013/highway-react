/** In this file, we create a React component which incorporates components provided by material-ui */
var React = require('react'),
    mui = require('material-ui'),


    Paper = mui.Paper,
    RaisedButton = mui.RaisedButton,
    FlatButton = mui.RaisedButton;
    
/** Declare all components here **/

  var Content = React.createClass({

  render: function() {
    return (
      <div id="content-container">
        <div id="content-container-one">
          <Paper zDepth={1}>
            <p> Content React Component 1</p>
            <p> Content React Component 1</p>
            <p> Content React Component 1</p>
            <p> Content React Component 1</p>
            <p> Content React Component 1</p>
          </Paper>
        </div>

        <div id="content-container-two">
          <Paper zDepth={1}>
            <p> Content React Component 2</p>
            <p> Content React Component 2</p>
            <p> Content React Component 2</p>
            <p> Content React Component 2</p>
            <p> Content React Component 2</p>
          </Paper>
        </div>

        <div id="content-container-three">
          <Paper zDepth={1}>
            <p> Content React Component 3</p>
            <p> Content React Component 3</p>
            <p> Content React Component 3</p>
            <p> Content React Component 3</p>
            <p> Content React Component 3</p>
          </Paper>
        </div>

      </div>  
    );
  }

});

module.exports = Content;
