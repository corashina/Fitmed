import React, { Component } from 'react'
import { logoutUser } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class NavbarAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount() {
    if (localStorage.getItem('jwt')) this.setState({ isLoggedIn: true });
  }
  onLogout() {
    this.props.logoutUser();
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white" style={{ padding: '0 1rem' }}>
            <a href="/" className="brand-logo">Fitmed</a>
            <ul className="right hide-on-med-and-down">
              < div >
                <li><a href="/admin/uzytkownicy"><i className="material-icons right">format_list_bulleted</i>Users</a></li>
                <li><a href="/admin/diety"><i className="material-icons left">local_dining</i>Diety</a></li>
                <li><a href="/admin/przepisy"><i className="material-icons left">event_note</i>Przepisy</a></li>
                <li><a href="/admin/produkty"><i className="material-icons left">trending_up</i>Produkty</a></li>
                <li><a href="/admin/treningi"><i className="material-icons left">fitness_center</i>Treningi</a></li>
                <li onClick={this.onLogout}><a href="/logowanie"><i className="material-icons">power_settings_new</i></a></li>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

NavbarAdmin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(NavbarAdmin)