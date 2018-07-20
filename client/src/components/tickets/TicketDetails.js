import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchTicket, updateTicket} from '../../actions/tickets';
import {fetchAllComments, createComment} from '../../actions/comments';
import TicketForm from './TicketForm';
import CommentForm from '../comments/CommentForm';
import {Link} from 'react-router-dom';

class TicketDetails extends PureComponent {  
  state = {
    edit: false
  }

  authorRisk() {
    const userIdTickets = this.props.tickets.map(ticket => {
      return ticket.user.id
    })
    const numTicketsByUser = userIdTickets.filter(creator => {
      return creator = this.props.ticket.user.id
    }).length

    if (numTicketsByUser === 1) 
      return 10 
      else return 0
  }
  
  averagePriceRisk() {
    const ticketsPrices = this.props.tickets.map(ticket => ticket.price) 
     //console.log(this.props.tickets)
    const totalTicketsSum = ticketsPrices.reduce((accumulator, currentValue) => {
      return (accumulator + currentValue)
    })                
    const averagePrice = totalTicketsSum/this.props.tickets.length 
    
    const expensiveRisk = ((averagePrice - this.props.ticket.price)/averagePrice)*100
    const cheapRisk = ((this.props.ticket.price - averagePrice)/averagePrice)*100

    if (averagePrice>this.props.ticket.price){
      return cheapRisk 
    } else if (cheapRisk<-10){
      return -10
    } else return expensiveRisk    
  }

  hoursRisk() {
    const timestamp_hours = this.props.ticket.createdAt.slice(11, 13)          
    if (timestamp_hours >= 9 && timestamp_hours <= 17) {
        return -10
    } else return 10
  }

  commentsRisk(){
    if (this.props.comments.length > 3) {
        return 5
    } else return 0
  }

  FraudRisk() {
    const total = this.authorRisk() + 
    // this.averagePriceRisk() + 
      this.hoursRisk() + this.commentsRisk()
    
    if (total<5) {
        return 5 
    } else if (total>95) {
        return "It is a possible fraud"
    } else return total    
    
    // const newTotal = new Number(total)
    // if (newTotal<5) {
    //     return 5 
    // } else if (newTotal>95) {
    //     return "It is a possible fraud"
    // } else return newTotal
  } 
    
  createComment = (comment) => {
    comment.ticket = this.props.ticket
    this.props.createComment(comment)
  }  

  componentWillMount(props) {
    this.props.fetchTicket(this.props.match.params.id)   
    this.props.fetchAllComments()    
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  updateTicket = (ticket) => {
    this.props.updateTicket(this.props.match.params.id, ticket)
    this.toggleEdit()
  }
  
  
  render() {
    const {ticket} = this.props
    if (!ticket) return null

    return (
      <div>     
        { 
          this.props.currentUser && 
          this.state.edit &&
          <TicketForm initialValues={ticket} onSubmit={this.updateTicket} />
        }     
      
        { !this.state.edit && 
          <div>
            <h1>{ticket.ticketAuthor}</h1>             
            <p>Fraud Risk = {this.FraudRisk()} %</p>
            <p>{ticket.price} &euro;</p>
            <p>{ticket.description}</p>
         
            { this.props.currentUser && 
              <button onClick={ this.toggleEdit }>Edit ticket</button>
            }            
          </div>
        }

        <dev>         
          <h3>Comments</h3>              
          { ticket.comments.map(comment => (
            <div key={comment.id}>{
              <p>
                <Link to={`/comments/${comment.id}`}>{comment.commentAuthor}</Link>
              </p>}
              <p>{comment.text}</p>
            </div>)   
          )}  
        
          { 
            this.props.currentUser && 
              <div>                     
                <h3>Create new comment</h3>
                <CommentForm onSubmit={this.createComment} />
              </div>
          }                        
        </dev>  
        
        { !this.props.currentUser && <p>Please <Link to="/login">Login</Link></p> }
        { !this.props.currentUser && <p>New user? <Link to="/signup">Sign up</Link></p> } 
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    ticket: state.ticket,
    tickets: state.tickets,
    comments: state.comments, 
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, { 
  fetchTicket, 
  updateTicket, 
  fetchAllComments, 
  createComment
})(TicketDetails)