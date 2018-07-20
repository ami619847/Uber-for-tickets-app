import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchEvent} from '../../actions/events';
import {fetchAllTickets, createTicket} from '../../actions/tickets';
import {Link} from 'react-router-dom';
import TicketForm from '../tickets/TicketForm';

import Typography from '@material-ui/core/Typography';
import './EventsList.css';

class EventDetails extends PureComponent {
  
  createTicket = (ticket) => {
    ticket.event = this.props.event
    //console.log(ticket)
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
        <div className="flex-container">
          <Typography variant="display1" color="inherit" align="center" style={{flex: 1}}>{event.name.toUpperCase()}</Typography>  
            { !event.picture && 'There is no picture' }
            <img src = {event.picture} alt="event"/>
            <p>Event details: {event.description}</p>
            <p>{event.date}</p>
        </div>
        <br/>

        <Typography variant="headline" color="inherit" align="center" style={{flex: 1}}>TICKETS</Typography>  
                    
          { event.tickets.map(ticket => (
            <div className="flex-container" key={ticket.id}>{
              <p>Author: {ticket.ticketAuthor.toUpperCase()}</p>}
              <p>&euro; {ticket.price}</p>
              <p>Details: 
                <Link to={`/tickets/${ticket.id}`}> {ticket.description}</Link>
              </p>
            </div>)   
          )} 

          { 
            this.props.currentUser && 
              <div>
                <Typography variant="headline" color="inherit" align="center" style={{flex: 1}}>Create new ticket</Typography>                     
                <br/>
                <TicketForm onSubmit={this.createTicket} />
              </div>
          }             
            
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