import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div>
        <div className="col s12 m7" style={{ padding: '5%' }}>
          <h2 className="header center">Error</h2>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <h5>Nie znaleziono</h5>
                <p>Podana strona nie istnieje</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
