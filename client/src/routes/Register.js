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
	onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
	onRadioChange(value) { this.setState({ sex: value }) }
	onSubmit(e) {
		e.preventDefault();

		const newUser = {
			firstname: this.state.firstname,
			lastname: this.state.lastname,
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
					<input type="text"
						placeholder="firstname"
						name="firstname"
						value={this.state.firstname}
						onChange={this.onChange} />
					<input type="text"
						placeholder="lastname"
						name="lastname"
						value={this.state.lastname}
						onChange={this.onChange} />
					<input type="text"
						placeholder="email"
						name="email"
						value={this.state.email}
						onChange={this.onChange} />
					<input type="password"
						placeholder="password"
						name="password"
						value={this.state.password}
						onChange={this.onChange} />
					<input type="password"
						placeholder="password2"
						name="password2"
						value={this.state.password2}
						onChange={this.onChange} />
					<input type="date"
						placeholder="birthday"
						name="birthday"
						value={this.state.birthday}
						onChange={this.onChange} />

					<p>
						<label>
							<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Male')} checked={this.state.sex === 'Male'} />
							<span>Male</span>
						</label>
					</p>
					<p>
						<label>
							<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Female')} />
							<span>Female</span>
						</label>
					</p>

					<input type="text"
						placeholder="phone"
						name="phone"
						value={this.state.phone}
						onChange={this.onChange} />

					<input type="submit" onClick={this.onSubmit} />
				</form>
				<div>
					<p>Fistname: {this.state.firstname}</p>
					<p>Lastname: {this.state.lastname}</p>
					<p>Email: {this.state.email}</p>
					<p>Password: {this.state.password}</p>
					<p>Password2: {this.state.password2}</p>
					<p>Birthday: {this.state.birthday}</p>
					<p>Sex: {this.state.sex}</p>
					<p>Phone: {this.state.phone}</p>
				</div>
			</div>
		)
	}
}
