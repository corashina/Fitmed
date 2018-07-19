import React, { Component } from 'react'

export default class NavbarAdmin extends Component {
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
            <a href="/home" className="brand-logo">Fitmed</a>
            <ul className="right hide-on-med-and-down">
              < div >
                <li><a href="/admin/uzytkownicy"><i className="material-icons right">format_list_bulleted</i>Users</a></li>
                <li><a href="/admin/diety"><i className="material-icons right">local_dining</i>Diets</a></li>
                <li><a href="/admin/przepisy"><i className="material-icons right">event_note</i>Recipes</a></li>
                <li><a href="/admin/produkty"><i className="material-icons right">trending_up</i>Products</a></li>
                <li><a href="/admin/treningi"><i className="material-icons right">fitness_center</i>Trainings</a></li>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

