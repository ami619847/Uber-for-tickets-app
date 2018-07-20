import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button';
import '../events/EventsList.css';

class TicketForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (e) => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
	}
	
	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit} className="eventForm">
                <div>
					<label htmlFor="ticketAuthor">Ticket Author</label>
					<br/>
					<input name="ticketAuthor" id="ticketAuthor" value={
						this.state.ticketAuthor !== undefined ? this.state.ticketAuthor : initialValues.ticketAuthor || '' 
					} onChange={ this.handleChange } />
				</div>
				<br/>

				<div>
					<label htmlFor="price">Price</label>
					<br/>
					<input name="price" id="price" value={
						this.state.price !== undefined ? this.state.price : initialValues.price || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

                <div>
					<label htmlFor="description">Ticket description</label>
					<br/>
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>
				<Button type="submit" variant="outlined">Save ticket</Button>
			</form>
		)
	}
}

export default TicketForm