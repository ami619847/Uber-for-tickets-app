import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllEvents, createEvent } from '../actions/events';
import { Link } from 'react-router-dom';
import NewEventForm from './NewEventForm';

class EventList extends PureComponent{
    static propTypes = {
        events: PropTypes.arrayOf(PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string.isRequired,
          picture: PropTypes.string.isRequired,
          date: PropTypes.date.isRequired //check if its a date proptype or string
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

        return(
            <div>
                <h1>All events</h1>
                                
                { events.map(event => (
                    <div key={ event.id }>
                        <p>{ event.id }</p>
                        <h3><Link to={ `/events/${event.id}` }>{ event.name }</Link></h3>
                        <p>{ event.picture }</p>
                        <p>{ event.description }</p>
                        <p>{ event.date }</p>                    
                    </div>
                ))}
                
                <h3>Create new event</h3>
                <NewEventForm onSubmit={ this.createEvent }/>
            </div>
        )
    }
} 

const mapStateToProps = function (state) {
    return {
        events: state.events
    }
}

export default connect(mapStateToProps, { 
    fetchAllEvents, 
    createEvent
})(EventList)