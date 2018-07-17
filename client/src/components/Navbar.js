import React, { Component } from 'react'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }
  componentDidMount() {
    if (localStorage.getItem('jwt')) this.setState({ isLoggedIn: true });
  }
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white" style={{ padding: '0 1rem' }}>
            <a href="/home" className="brand-logo">Fitmed<i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              {this.state.isLoggedIn && JSON.parse(localStorage.getItem('user')).role === 'User' &&
                < div >
                  <li><a href="/panel"><i className="material-icons right">format_list_bulleted</i>Panel</a></li>
                  <li><a href="/diet"><i className="material-icons right">local_dining</i>Diet</a></li>
                  <li><a href="/recipe"><i className="material-icons right">event_note</i>Recipes</a></li>
                  <li><a href="/supplement "><i className="material-icons right">trending_up</i>Supplement</a></li>
                  <li><a href="/training"><i className="material-icons right">fitness_center</i>Training</a></li>
                </div>
              }
              {this.state.isLoggedIn && JSON.parse(localStorage.getItem('user')).role === 'Admin' &&
                < div >
                  <li><a href="/users"><i className="material-icons right">format_list_bulleted</i>Users</a></li>
                  <li><a href="/diets"><i className="material-icons right">local_dining</i>Diets</a></li>
                  <li><a href="/recipes"><i className="material-icons right">event_note</i>Recipes</a></li>
                  <li><a href="/products "><i className="material-icons right">trending_up</i>Products</a></li>
                  <li><a href="/trainings"><i className="material-icons right">fitness_center</i>Trainings</a></li>
                </div>
              }
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

