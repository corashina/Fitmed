import React, { Component } from 'react';
import { registerUser } from '../actions/authActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			password: '',
			password2: '',
			birthday: '',
			sex: 'Mężczyzna',
			phone: '',
			plan: 11,
			errors: {},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.handleRadioChange = this.handleRadioChange.bind(this);
	}
	componentDidMount() {
		if (this.props.auth.isAuthenticated) this.props.history.push('/panel');
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.errors) {
			this.setState({ errors: nextProps.errors });
		}
	}
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
			phone: this.state.phone,
			plan: this.state.plan
		};

		this.props.registerUser(newUser, this.props.history);
	}
	onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
	onRadioChange(e) { this.setState({ sex: e }) }
	handleRadioChange(e) {
		console.log(e.target.value)
		this.setState({ plan: e.target.value })
	}
	render() {
		const { errors } = this.state;
		return (
			<div>
				<form noValidate onSubmit={this.onSubmit} style={{ padding: '2%' }}>
					<div className="row">
						<div className="col s3"></div>
						<div className="col s6 center">
							<div className="card horizontal">
								<div className="card-stacked">
									<div className="card-content">
										<div className="row">
											<div className="input-field col s6">
												<i className="material-icons prefix">account_circle</i>
												<input
													id="firstname"
													className={errors.firstname === undefined ? '' : 'invalid'}
													type="text"
													autoComplete="off"
													placeholder="Imie"
													name="firstname"
													value={this.state.firstname}
													onChange={this.onChange} />
												<span className="helper-text" data-error={errors.firstname}></span>
											</div>
											<div className="input-field col s6">
												<input
													id="lastname"
													type="text"
													autoComplete="off"
													className={this.state.errors.lastname === undefined ? '' : 'invalid'}
													placeholder="Nazwisko"
													name="lastname"
													value={this.state.lastname}
													onChange={this.onChange} />
												<span className="helper-text" data-error={errors.lastname}></span>
											</div>
										</div>
										<div className="input-field col s12">
											<i className="material-icons prefix">email</i>
											<input
												id="email"
												type="email"
												autoComplete="off"
												className={errors.email === undefined ? '' : 'invalid'}
												placeholder="Email"
												name="email"
												value={this.state.email}
												onChange={this.onChange} />
											<span className="helper-text" data-error={errors.email}></span>
										</div>
										<div className="input-field col s12">
											<i className="material-icons prefix">lock</i>
											<input
												id="password"
												type="password"
												autoComplete="off"
												className={errors.password === undefined ? '' : 'invalid'}
												placeholder="Hasło"
												name="password"
												value={this.state.password}
												onChange={this.onChange} />
											<span className="helper-text" data-error={errors.password}></span>
										</div>
										<div className="input-field col s12">
											<i className="material-icons prefix">repeat</i>
											<input
												id="password2"
												type="password"
												autoComplete="off"
												className={errors.password === undefined ? '' : 'invalid'}
												placeholder="Potwierdź hasło"
												name="password2"
												value={this.state.password2}
												onChange={this.onChange} />
											<span className="helper-text" data-error={errors.password2}></span>
										</div>
										<div className="input-field col s12">
											<i className="material-icons prefix">date_range</i>
											<input
												id="date"
												type="date"
												className={errors.birthday === undefined ? '' : 'invalid'}
												placeholder="Data urodzenia"
												name="birthday"
												value={this.state.birthday}
												onChange={this.onChange} />
											<span className="helper-text" data-error={errors.birthday}></span>
										</div>
										<div className="input-field col s12">
											<i className="material-icons prefix">phone_android</i>
											<input
												id="phone"
												type="text"
												autoComplete="off"
												className={errors.phone === undefined ? '' : 'invalid'}
												placeholder="Telefon"
												name="phone"
												value={this.state.phone}
												onChange={this.onChange} />
											<span className="helper-text" data-error={errors.phone}></span>
										</div>
										<div className="row">
											<div className="col s6 offset-s4">
												<label>
													<div className="input-field col">
														<input defaultChecked name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Mężczyzna')} />
														<span>Mężczyzna</span>
													</div>
												</label>
												<label>
													<div className="input-field col">
														<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Kobieta')} />
														<span>Kobieta</span>
													</div>
												</label>
											</div>
										</div>
										<div className="row">
											<div className="col s12">
												<ul id="tabs-swipe-demo" className="tabs">
													<li className="tab col s4">
														<a className="active" href="#plan-swipe-1">Dieta</a>
													</li>
													<li className="tab col s4">
														<a href="#plan-swipe-2">Trening</a>
													</li>
													<li className="tab col s4">
														<a href="#plan-swipe-3">Dieta + Trening</a>
													</li>
												</ul>
												<div id="plan-swipe-1" className="col s12">
													<div className="row"></div>
													<div className="row">
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" defaultChecked value="11" onChange={this.handleRadioChange} />
															<span>1 Miesiąc</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="12" onChange={this.handleRadioChange} />
															<span>3 Miesiące</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="13" onChange={this.handleRadioChange} />
															<span>6 Miesięcy</span>
														</label>
													</div>
													<div className="row">
														<div className="col s4">
															<p>149,99 zł ({parseFloat(Math.round(149.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>169,99 zł ({parseFloat(Math.round(169.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>189,99 zł ({parseFloat(Math.round(189.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
													</div>
												</div>
												<div id="plan-swipe-2" className="col s12">
													<div className="row"></div>
													<div className="row">
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="21" onChange={this.handleRadioChange} />
															<span>1 Miesiąc</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="22" onChange={this.handleRadioChange} />
															<span>3 Miesiące</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="23" onChange={this.handleRadioChange} />
															<span>6 Miesięcy</span>
														</label>
													</div>
													<div className="row">
														<div className="col s4">
															<p>259,99 zł ({parseFloat(Math.round(259.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>279,99 zł ({parseFloat(Math.round(279.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>299,99 zł ({parseFloat(Math.round(299.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
													</div>
												</div>
												<div id="plan-swipe-3" className="col s12">
													<div className="row"></div>
													<div className="row">
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="31" onChange={this.handleRadioChange} />
															<span>1 Miesiąc</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="32" onChange={this.handleRadioChange} />
															<span>3 Miesiące</span>
														</label>
														<label className="col s4 black-text">
															<input name="plan-group" type="radio" value="33" onChange={this.handleRadioChange} />
															<span>6 Miesięcy</span>
														</label>
													</div>
													<div className="row">
														<div className="col s4">
															<p>439,99 zł ({parseFloat(Math.round(439.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>459,99 zł ({parseFloat(Math.round(459.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
														<div className="col s4">
															<p>479,99 zł ({parseFloat(Math.round(479.99 * 100) / 100 / 12).toFixed(2)} zł / mc)</p>
														</div>
													</div>
												</div>
												{this.state.plan}
											</div>
										</div>

										<button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">Zarejestruj się
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div >
		)
	}
}

Register.propTypes = {
	registerUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(Register)
