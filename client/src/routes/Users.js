import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers } from '../actions/authActions'

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    this.props.getUsers();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors.permission) this.props.history.push('/404')
    this.setState({ users: nextProps.auth.users })
  }
  render() {
    return (
      <div >
        <NavbarAdmin />
        <table className="striped highlight centered">
          <thead >
            <tr>
              <th>Imie</th>
              <th>Nazwisko</th>
              <th>Email</th>
              <th>Data urodzenia</th>
              <th>Płeć</th>
              <th>Numer telefonu</th>
            </tr>
          </thead>

          <tbody>
            {this.state.users.map((user) =>
              <tr key={user.email}>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.birthday.split('T')[0]}</td>
                <td>{user.sex}</td>
                <td>{user.phone}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};


const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getUsers })(Users)
