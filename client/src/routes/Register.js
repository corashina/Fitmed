import React, { Component } from 'react'
import axios from 'axios';


export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			password2: '',
			birthday: '',
			sex: '',
			phone: '',
			errors: {}
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			firstname: this.state.firstname,
			lastanme: this.state.lastanme,
			email: this.state.email,
			password: this.state.password,
			password2: this.state.password2,
			birthday: this.state.birthday,
			sex: this.state.sex,
			phone: this.state.phone
		};
		axios.post('http://localhost:5000/api/register', newUser)
			.then(res => console.log(res))
			.catch(err => console.log(err));
	}
	render() {
		return (
			<div>
				<form>
					<input type="firstname"
						placeholder="firstname"
						name="firstname"
						value={this.state.firstname}
						onChange={this.onChange} />
					<input type="lastname"
						placeholder="lastname"
						name="lastname"
						value={this.state.lastname}
						onChange={this.onChange} />
					<input type="email"
						placeholder="email"
						name="email"
						value={this.state.email}
						onChange={this.onChange} />
					<input type="password"
						placeholder="password"
						name="password"
						value={this.state.password}
						onChange={this.onChange} />
					<input type="password2"
						placeholder="password2"
						name="password2"
						value={this.state.password2}
						onChange={this.onChange} />
					<input type="birthday"
						placeholder="birthday"
						name="birthday"
						value={this.state.birthday}
						onChange={this.onChange} />
					<input type="sex"
						placeholder="sex"
						name="sex"
						value={this.state.sex}
						onChange={this.onChange} />
					<input type="phone"
						placeholder="phone"
						name="phone"
						value={this.state.phone}
						onChange={this.onChange} />

					<input type="submit" onClick={this.onSubmit} />

				</form>
			</div>
		)
	}
}
