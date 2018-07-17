import React, { Component } from 'react'
import Navbar from '../components/Navbar'
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
			sex: 'Male',
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
		axios.post('/api/users/register', newUser)
			.then(res => {
				this.setState({ errors: { message: "User created!" } })
			})
			.catch(err => {
				this.setState({ errors: err.response.data })
			});
	}
	render() {
		return (
			<div>
				<Navbar />
				<form className="register" noValidate onSubmit={this.onSubmit}>
					<div className="col s12 m7 register">
						<div className="card horizontal">
							<div className="card-stacked">
								<div className="card-content">
									<div className="input-field col s12">
										<input id="firstname" className={this.state.errors.firstname === undefined ? '' : 'invalid'} type="text" autoComplete="off"
											placeholder="Firstname"
											name="firstname"
											value={this.state.firstname}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.firstname}></span>
									</div>
									<div className="input-field col s12">
										<input id="lastname" type="text" autoComplete="off" className={this.state.errors.lastname === undefined ? '' : 'invalid'}
											placeholder="Lastname"
											name="lastname"
											value={this.state.lastname}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.lastname}></span>
									</div>
									<div className="input-field col s12">
										<input id="email" type="email" autoComplete="off" className={this.state.errors.email === undefined ? '' : 'invalid'}
											placeholder="Email"
											name="email"
											value={this.state.email}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.email}></span>
									</div>
									<div className="input-field col s12">
										<input id="password" type="password" autoComplete="off" className={this.state.errors.password === undefined ? '' : 'invalid'}
											placeholder="Password"
											name="password"
											value={this.state.password}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.password}></span>
									</div>
									<div className="input-field col s12">
										<input id="password2" type="password" autoComplete="off" className={this.state.errors.password === undefined ? '' : 'invalid'}
											placeholder="Confirm password"
											name="password2"
											value={this.state.password2}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.password2}></span>
									</div>
									<div className="input-field col s12">
										<input id="date" type="date" className={this.state.errors.birthday === undefined ? '' : 'invalid'}
											placeholder="Birthday"
											name="birthday"
											value={this.state.birthday}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.birthday}></span>
									</div>

									<label>
										<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Male')} checked={this.state.sex === 'Male'} />
										<span style={{ marginRight: '20px' }} >Male</span>
									</label>
									<label>
										<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Female')} />
										<span>Female</span>
									</label>

									<div className="input-field col s12">
										<input id="phone" type="text" autoComplete="off" className={this.state.errors.phone === undefined ? '' : 'invalid'}
											placeholder="Phone"
											name="phone"
											value={this.state.phone}
											onChange={this.onChange} />
										<span className="helper-text" data-error={this.state.errors.phone}></span>
									</div>
									<button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">Submit
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div >
		)
	}
}
