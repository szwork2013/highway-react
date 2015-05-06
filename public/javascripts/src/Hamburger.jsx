var React = require('react'),
    mui = require('material-ui'),
    FlatButton = mui.FlatButton,
    MenuItem = mui.MenuItem,
    LeftNav = mui.LeftNav;

   menuItems = [
    { route: 'route1', text: ' Green' },
    { route: 'route 2', text: 'Yellow' },
    { route: 'route 3', text: 'Red' },
    { route: 'route 4', text: 'Blue' }
  ];


var Hamburger = React.createClass({

  getInitialState: function() {
    return {
      isDocked: false
    };
  },

  render: function() {
    var header = <div className="logo" onClick={this._onHeaderClick}> Account </div>;

    return (
      <div className="left-nav">
        <FlatButton label="x" onTouchTap={this._showLeftNavClick} />
        <LeftNav ref="dockedLeftNav" docked={this.state.isDocked} menuItems={menuItems} header={header}/>
        <LeftNav ref="leftNav" docked={false} menuItems={menuItems} header ={header}/>
      </div>
    );
  },

  _showLeftNavClick: function() {
    this.refs.leftNav.toggle();
  },

});

module.exports = Hamburger;
