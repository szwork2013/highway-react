var React = require('react')
  , mui = require('material-ui')
  , TextField = mui.TextField;

var Contact = React.createClass({
	render: function (){
		return (
		  
		    <a href="#" className="list-group-item">
            <h2 className="list-group-item-heading listing-company">
              <span className="listing-position-name"> Opportunity: { this.props.position }</span>
              <small className="listing-company-name"> Company: { this.props.company }</small>
              <small className="listing-location"> Location: { this.props.local }</small>
            </h2>

          <p className="list-group-item-text">
            <span className="listing-job-type">Looking for: { this.props.lookingFor }</span>
          </p>
          
          <p className="list-group-item-text">
            <span className="listing-posted">Posted: { this.props.postedDate }</span>
            <span className="listing-company-category">{ this.props.category }</span>
          </p>
        </a>
    );
  }
});

module.exports = Contact;