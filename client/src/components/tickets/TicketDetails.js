import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {fetchTicket, updateTicket} from '../../actions/tickets';
import {fetchAllComments, createComment} from '../../actions/comments';
import TicketForm from './TicketForm';
import {Link} from 'react-router-dom';
import CommentForm from '../comments/CommentForm';

class TicketDetails extends PureComponent {
  state = {
    edit: false
  }

  createComment = (comment) => {
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
        { this.props.currentUser && 
          this.state.edit &&
          <TicketForm initialValues={ticket} onSubmit={this.updateTicket} />
        }
      
        { !this.state.edit && 
          <div>
            <h1>{ticket.ticketAuthor}</h1>
            <p>{ticket.price}</p>
            <p>{ticket.description}</p>
            <button onClick={ this.toggleEdit }>Edit ticket</button>
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
    comments: state.comments, 
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps, {fetchTicket, updateTicket, fetchAllComments, createComment})(TicketDetails)