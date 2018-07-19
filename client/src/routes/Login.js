import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { loginUser } from '../actions/authActions'
import { connect } from 'react-redux';
import Navbar from '../components/Navbar';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push('/panel');
    if (nextProps.auth.user.role === 'Admin') this.props.history.push('/admin/panel');
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;
    return (
      <div>
        <Navbar />
        <form className='card-center' noValidate onSubmit={this.onSubmit}>
          <div className="col s12 m7">
            <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">email</i>
                    <input id="email" className={errors.email === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.email}></span>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" className={this.state.errors.password === undefined ? '' : 'invalid'} type="password" autoComplete="off"
                      placeholder="Hasło"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.password}></span>
                  </div>
                  <button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">Zaloguj się
									</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }

}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login)
