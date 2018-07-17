import React, { Component } from 'react'
import axios from 'axios';


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
        localStorage.setItem('user', JSON.stringify(res.data.user));
        this.setState({ errors: res.data.user })
      })
      .catch(err => { this.setState({ errors: err.response.data }) });
  }
  render() {
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
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

          <input type="submit" />
        </form>
        <div>
          <p>Errors: {Object.values(this.state.errors).map((error, i) => <li key={i}>{error}</li>)}</p>
          <p>Email: {this.state.Email}</p>
          <p>Password: {this.state.Password}</p>
        </div>
      </div>
    )
  }
}
