import React, { Component } from 'react'
import Navbar from '../components/Navbar'

export default class Landing extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="card card-center" >
          <div className="card-content s6">
            <div className="row">
              <div className="col s12">
                <a href="/logowanie">
                  <button className="btn waves-effect waves-light" style={{ width: '100%' }}>Zaloguj się
									</button>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <a href="/rejestracja">
                  <button className="btn waves-effect waves-light center" style={{ width: '100%' }}>Zarejestruj się
									</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
