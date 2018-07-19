import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchEvent} from '../../actions/events';
import {fetchAllTickets, createTicket} from '../../actions/tickets';
import {Link} from 'react-router-dom';
import TicketForm from '../tickets/TicketForm';

class EventDetails extends PureComponent {
  
  createTicket = (ticket) => {
    this.props.createTicket(ticket)
  }

  componentWillMount(props) {
    this.props.fetchEvent(this.props.match.params.id)
    this.props.fetchAllTickets()
  }

  render() {
    const {event} = this.props
    if (!event) return null

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
                    <Link to={`/tickets/${ticket.id}`}>{ticket.ticketAuthor}</Link>
                  </p>}
                  <p>{ticket.price}</p>
                  <p>{ticket.description}</p>
                </div>)   
              )} 

              { 
                this.props.currentUser && this.props.event.id &&
                  <div>                     
                    <h3>Create new ticket </h3>
                    <TicketForm onSubmit={this.createTicket} />
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
    tickets: state.tickets,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchEvent, fetchAllTickets, createTicket})(EventDetails)