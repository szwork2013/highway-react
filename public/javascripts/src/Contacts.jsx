var React = require('react')
  , Contact = require('./Contact.jsx')
  , mui = require('material-ui')
  , TextField = mui.TextField;

var Contacts = React.createClass({

     getInitialState: function() {
        return {
            data: [
                {
                    company: 'CommonHealth ACTION',
                    position: 'Software Engineering',
                    local: 'Washington, DC, USA',
                    lookingFor: 'Node, Express, React, Redis, Rethink',
                    postedDate: '12th  May 2015',
                    description: 'cool job',
                    category: 'Engineering'
                },
                {
                    company: 'Institute Public Health Innovation',
                    position: 'Network Admin',
                    local: 'Washington, DC, USA',
                    lookingFor: 'Windows, VPN, DHCP, Firewalls, Routers, Switches, Ports',
                    postedDate: '12th May 2015',
                    description: 'cool job',
                    category: 'Engineering'
                }
            ]
        };
    },

    render: function(){
      return (
        <div id="contacts-container"> {this.state.data.map(function(contact){
          return (
            <Contact
              company= {contact.company} 
               position= {contact.position}
                local= {contact.local} 
                 lookingFor= {contact.lookingFor}
                  postedDate= {contact.postedDate} description= {contact.description}
                   category= {contact.category} 
            />
                    )
                })}
            
            </div>
        )
      }
  });


module.exports = Contacts;
