import React, { Component } from 'react';
import Navbar from '../components/Navbar';

export default class Home extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="col s12 m7" style={{ padding: '2%' }}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <h5>Strona główna</h5>
                <p>Siemano</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
}
