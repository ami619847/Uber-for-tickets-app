import React, {PureComponent} from 'react';
import Button from '@material-ui/core/Button';
import './EventsList.css';

class EventForm extends PureComponent {
	state = {}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.onSubmit(this.state)
	}

	handleChange = (event) => {
        const {name, value} = event.target

        this.setState({
            [name]: value
        })
    }

	render() {
		const initialValues = this.props.initialValues || {}
		return (
			<form onSubmit={this.handleSubmit} className="eventForm">
				<div>
					<label htmlFor="name">Event name</label>
					<br/>
					<input name="name" id="name" value={
						this.state.name !== undefined ? this.state.name : initialValues.name || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

                <div>
					<label htmlFor="description">Event description</label>
					<br/>
					<input name="description" id="description" value={
						this.state.description !== undefined ? this.state.description : initialValues.description || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

				<div>
					<label htmlFor="picture">Upload url</label>
					<br/>
					<input name="picture" id="picture" value={
						this.state.picture !== undefined ? this.state.picture : initialValues.picture || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

                <div>
					<label htmlFor="date">Event date</label>
					<br/>
					<input name="date" id="date" value={
						this.state.date !== undefined ? this.state.date : initialValues.date || ''
					} onChange={ this.handleChange } />
				</div>
				<br/>

				<Button type="submit" variant="outlined">Save event</Button>
			</form>
		)
	}
}

export default EventForm