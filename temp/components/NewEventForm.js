import React, {PureComponent} from 'react'

class NewEventForm extends PureComponent {
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
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor="name">Name</label>
					<input name="name" id="name" value={
                        this.state.name !== undefined ?
                        this.state.name : initialValues.name
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="description">Description</label>
					<input name="description" id="description" value={
                        this.state.description !== undefined ?
                        this.state.description : initialValues.description 
					} onChange={ this.handleChange } />
				</div>

                <div>
					<label htmlFor="picture"></label>
					<input name="picture" id="picture" value={
                        this.state.picture !== undefined ?
                        this.state.picture : initialValues.picture 
					} onChange={ this.handleChange } />
                </div>
                
                <div>
					<label htmlFor="date">Date</label>
					<input name="date" id="date" value={
                        this.state.date !== undefined ?
                        this.state.date : initialValues.date
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Save</button>
			</form>
		)
	}
}

export default NewEventForm