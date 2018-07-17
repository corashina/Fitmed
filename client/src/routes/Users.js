import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    axios.get('/api/users', { params: { jwt: localStorage.getItem('jwt') } })
      .then(res => this.setState({ users: res.data }))
      .catch(err => this.props.history.push('/home'));
  }
  render() {
    return (
      <div >
        <Navbar />
        <table className="striped highlight">
          <thead >
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Birthday</th>
              <th>Sex</th>
              <th>Phone</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) =>
              <tr key={user.email}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birthday}</td>
                <td>{user.sex}</td>
                <td>{user.phone}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
