import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchTicket, updateTicket} from '../../actions/tickets'
import TicketForm from './TicketForm'

class TicketDetails extends PureComponent {
  state = {
    edit: false
  }

  toggleEdit = () => {
    this.setState({
      edit: !this.state.edit
    })
  }

  componentWillMount(props) {
    this.props.fetchTicket(this.props.match.params.id)
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
          this.state.edit &&
          <TicketForm initialValues={ticket} onSubmit={this.updateTicket} />
        }

        {
          !this.state.edit &&
          <div>
            <button onClick={ this.toggleEdit }>Edit ticket</button>
            <h1>{ ticket.ticketAuthor }</h1>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    ticket: state.ticket
  }
}

export default connect(mapStateToProps, {fetchTicket, updateTicket})(TicketDetails)