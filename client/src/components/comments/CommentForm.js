import React, {PureComponent} from 'react'
import Button from '@material-ui/core/Button';
import '../events/EventsList.css';

class CommentForm extends PureComponent {
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
					<label htmlFor="commentAuthor">Comment Author</label>
					<br/>
					<input name="commentAuthor" id="commentAuthor" value={
						this.state.commentAuthor !== undefined ? this.state.commentAuthor : initialValues.commentAuthor || '' 
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="text">Text</label>
					<br/>
					<input name="text" id="text" value={
						this.state.text !== undefined ? this.state.text : initialValues.text || ''
					} onChange={ this.handleChange } />
				</div>

				<Button type="submit" variant="outlined">Save comment</Button>
			</form>
		)
	}
}

export default CommentForm