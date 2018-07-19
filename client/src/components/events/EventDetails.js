import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchEvent} from '../../actions/events';
import {fetchAllTickets} from '../../actions/tickets';
import {Link} from 'react-router-dom';
import TicketForm from '../tickets/TicketForm';

class EventDetails extends PureComponent {
  componentWillMount(props) {
    this.props.fetchEvent(this.props.match.params.id)
    this.props.fetchAllTickets()
  }

  render() {
    const {event} = this.props
    if (!event) return null
    console.log(event)

    return (
      <div>
          <h1>{event.name}</h1>
          { !event.picture && 'There is no picture' }
          <img src = {event.picture} alt="event picture"/>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <dev>
            <h3>Event tickets</h3>
              
              { event.tickets.map(ticket => (
                <div key={ticket.id}>{
                  <p>
                    <Link to={`/events/${event.id}/${ticket.id}`}>{ticket.ticketAuthor}</Link>
                  </p>}
                  <p>{ticket.price}</p>
                  <p>{ticket.description}</p>
                </div>)   
              )} 

              { 
                this.props.currentUser && 
                  <div>                     
                    <h3>Create new ticket </h3>
                    <TicketForm onSubmit={this.createEvent} />
                  </div>
              }
              

          </dev>  
          { !this.props.currentUser && <p>Please <Link to="/login">Login</Link></p> }
          { !this.props.currentUser && <p>New user? <Link to="/signup">Sign up</Link></p> } 
      </div>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    event: state.event,
    tickets: state.tickets
  }
}

export default connect(mapStateToProps, {fetchEvent, fetchAllTickets})(EventDetails)