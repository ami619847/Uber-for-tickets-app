import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAllEvents, createEvent} from '../../actions/events';
import EventForm from './EventForm';

import Typography from '@material-ui/core/Typography';
import './EventsList.css'

class EventsList extends PureComponent {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired
    })).isRequired
  }

  createEvent = (event) => {
    this.props.createEvent(event)
  }

  componentWillMount() {
    this.props.fetchAllEvents()
  }

  render() {
    const {events} = this.props
    return (
      <div>
        
          <div>
            <Typography variant="display1" color="inherit" align="center" style={{flex: 1}}>EVENTS</Typography>        
            
            { events.map(event => (
              <div className="flex-container" key={event.id}>
                <p><Link to={ `/events/${event.id}` }>{event.name.toUpperCase()}</Link></p>
                <img src = {event.picture} alt="event" className="poster"/>
                <p>Date {event.date}</p>
              </div>
              )
            )} 
         
            { this.props.currentUser && 
              <div>                     
                <br/>
                <Typography variant="headline" color="inherit" align="center" style={{flex: 1}}>Create new event</Typography>
                <br/>
                <EventForm onSubmit={this.createEvent} />
              </div>
            }

          </div>
                         
        { !this.props.currentUser && <p>Please <Link to="/login">Login</Link></p> }
        { !this.props.currentUser && <p>New user? <Link to="/signup">Sign up</Link></p> }
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    events: state.events,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchAllEvents, createEvent})(EventsList)