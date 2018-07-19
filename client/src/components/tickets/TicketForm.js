import React, {PureComponent} from 'react'

class TicketForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (ticket) => {
        const {name, value} = ticket.target

        this.setState({
            [name]: value
        })
    }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit}>

                <div>
					<label htmlFor="ticketAuthor">{this.props.ticket.ticketAuthor}</label>
					<input name="ticketAuthor" id="ticketAuthor" value={
						this.state.ticketAuthor !== undefined ? this.state.ticketAuthor : initialValues.ticketAuthor
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="price">Price</label>
					<input name="price" id="price" value={
						this.state.price !== undefined ? this.state.price : initialValues.price
					} onChange={ this.handleChange } />
				</div>

                <div>
					<label htmlFor="description">Ticket description</label>
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description
					} onChange={ this.handleChange } />
				</div>

                <div>
					<label htmlFor="createdAt">{this.props.ticket.createdAt}</label>
					<input name="createdAt" id="createdAt" value={
						this.state.createdAt !== undefined ? this.state.createdAt : initialValues.createdAt
					} onChange={ this.handleChange } />
				</div>
				
				<button type="submit">Save ticket</button>
			</form>
		)
	}
}

export default TicketForm