import React, { Component } from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios.post('/api/users/login', userData)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        localStorage.setItem('user', JSON.stringify(jwt_decode(res.data.token).user));
        this.props.history.push('/home');
      })
      .catch(err => { this.setState({ errors: err.response.data }) });
  }
  render() {
    return (
      <div>
        <form className='card-center' noValidate onSubmit={this.onSubmit}>
          <div className="col s12 m7 register">
            <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
                  <div className="input-field col s6">
                    <i className="material-icons prefix">email</i>
                    <input id="email" className={this.state.errors.email === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.email}></span>
                  </div>
                  <div className="input-field col s6">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" className={this.state.errors.password === undefined ? '' : 'invalid'} type="password" autoComplete="off"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.password}></span>
                  </div>
                  <button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">Submit
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
