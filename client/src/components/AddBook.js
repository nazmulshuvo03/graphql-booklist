import React from 'react';
import { graphql } from 'react-apollo';
import compose from 'lodash.flowright';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries';

class AddBook extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			genre: '',
			authorId: ''
		};
	}
	displayAuthors() {
		// var data = this.props.data;
		var data = this.props.getAuthorsQuery;
		if (data.loading) {
			return <option disabled>Loding Authors...</option>;
		} else {
			return data.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	}

	submitForm(e) {
		e.preventDefault();
		this.props.addBookMutation({
			variables: {
				name: this.state.name,
				genre: this.state.genre,
				authorId: this.state.authorId
			},
			refetchQueries: [ { query: getBooksQuery } ]
		});
		this.setState({
			name: '',
			genre: '',
			authorId: ''
		});
	}

	render() {
		return (
			<form action="" id="add-book" onSubmit={this.submitForm.bind(this)}>
				<div className="field">
					<label htmlFor="">Book Name: </label>
					<input type="text" onChange={(e) => this.setState({ name: e.target.value })} />
				</div>

				<div className="field">
					<label htmlFor="">Genre: </label>
					<input type="text" onChange={(e) => this.setState({ genre: e.target.value })} />
				</div>

				<div className="field">
					<label htmlFor="">Author: </label>
					<select name="" id="" onChange={(e) => this.setState({ authorId: e.target.value })}>
						<option value="">Select author</option>
						{this.displayAuthors()}
					</select>
				</div>
				<button>+</button>
			</form>
		);
	}
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
