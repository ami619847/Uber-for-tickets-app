import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchAllEvents, createEvent} from '../../actions/events';
import EventForm from './EventForm';

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
            <h1>Current events </h1>        
            { events.map(event => (
              <div key={event.id}>
                <p>{event.id}</p>
                <p><Link to={ `/events/${event.id}` }>{event.name}</Link></p>
                <img src = {event.picture} alt="event picture"/>
                <p>{event.date}</p>
              </div>)
            )}

            { this.props.currentUser && 
              <div>                     
                <h3>Create new event </h3>
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