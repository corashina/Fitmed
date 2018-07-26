import React, { Component } from 'react';
import { registerUser } from '../actions/authActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import plan from '../img/plan.jpg';

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
			errors: {},
			planLength: 1,
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
			phone: this.state.phone
		};

		this.props.registerUser(newUser, this.props.history);
	}
	onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
	onRadioChange(value) { this.setState({ sex: value }) }
	onPlanLengthChange(value) { this.setState({ planLength: value }) }
	proceed() { this.setState({ chosenPlan: !this.state.chosenPlan }) }
	render() {
		const { errors } = this.state;
		return (
			<div>
				<Navbar />
				<form noValidate onSubmit={this.onSubmit} style={{ padding: '2%' }}>
					<div className="row" >
						<div className="col s4 ">
							<div className="card">
								<div className="card-image">
									<img src={plan} alt="Dieta" />
									<span className="card-title">Dieta</span>
								</div>
								<div className="card-content">
									<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, dolores.</p>
								</div>
							</div>
						</div>
						<div className="col s4 ">
							<div className="card">
								<div className="card-image">
									<img src={plan} alt="Trening" />
									<span className="card-title">Trening</span>
								</div>
								<div className="card-content">
									<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, dolores.</p>
								</div>
							</div>
						</div>
						<div className="col s4 ">
							<div className="card">
								<div className="card-image">
									<img src={plan} alt="Dieta + Trening" />
									<span className="card-title">Dieta + Trening</span>
								</div>
								<div className="card-content">
									<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, dolores.</p>
								</div>
							</div>
						</div>
						<div className="row">
							<label>
								<div className="input-field col s4 center">
									<input defaultChecked name="planLength" type="radio" value={this.state.planLength} onClick={(e) => this.onPlanLengthChange(1)} />
									<span>1 Miesiąc</span>
								</div>
							</label>
							<label>
								<div className="input-field col s4 center">
									<input name="planLength" type="radio" value={this.state.planLength} onClick={(e) => this.onPlanLengthChange(3)} />
									<span>3 Miesiące</span>
								</div>
							</label>
							<label>
								<div className="input-field col s4 center">
									<input name="planLength" type="radio" value={this.state.planLength} onClick={(e) => this.onPlanLengthChange(6)} />
									<span>6 Miesięcy</span>
								</div>
							</label>
						</div>
					</div>
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
											<label>
												<div className="input-field col s6">
													<input defaultChecked name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Mężczyzna')} />
													<span>Mężczyzna</span>
												</div>
											</label>
											<label>
												<div className="input-field col s6">
													<input name="sex" type="radio" value={this.state.sex} onClick={(e) => this.onRadioChange('Kobieta')} />
													<span>Kobieta</span>
												</div>
											</label>
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
