import React, {PureComponent} from 'react'

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
			<form onSubmit={this.handleSubmit}>
                <div>
					<label htmlFor="commentAuthor">Comment Author</label>
					<input name="commentAuthor" id="commentAuthor" value={
						this.state.commentAuthor !== undefined ? this.state.commentAuthor : initialValues.commentAuthor || '' 
					} onChange={ this.handleChange } />
				</div>

				<div>
					<label htmlFor="text">Text</label>
					<input name="text" id="text" value={
						this.state.text !== undefined ? this.state.text : initialValues.text || ''
					} onChange={ this.handleChange } />
				</div>

				<button type="submit">Save comment</button>
			</form>
		)
	}
}

export default CommentForm