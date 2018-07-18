import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchEvent} from '../../actions/events';
//import {Link} from 'react-router-dom';
//import TicketForm from './TicketForm';

class EventDetails extends PureComponent {
  componentWillMount(props) {
    this.props.fetchEvent(this.props.match.params.id)
  }

  render() {
    const {event} = this.props
    if (!event) return null
    const {tickets} = this.props

    return (
      <div>
          <h1>{event.name}</h1>
          <p>{event.description}</p>
          { !event.picture && 'There is no picture' }
          { event.picture }
          {/* { event.picture && event.picture.map (url =>
            <img src = { url } alt="event picture"/>)} */}
          <p>{event.date}</p>
          
          <div>
            {/* <h3>Event tickets </h3>        
                { tickets.map(ticket => (
                <div key={ticket.id}>
                    <p>
                        <Link to={ `/events/${event.id}/tickets` }>{ 
                            ticket.ticketAuthor 
                            }
                        </Link>
                    </p>
                    <p>{ticket.price}</p>
                    <p>{ticket.description}</p>                                
                </div>)
                )} */}
                       
            {/* <h3>Create new ticket</h3>
            <TicketForm onSubmit={this.createTicket} /> */}
          </div> 
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps, {fetchEvent})(EventDetails)