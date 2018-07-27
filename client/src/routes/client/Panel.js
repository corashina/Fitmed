import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Panel extends Component {
  render() {
    return (
      <div>
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

Panel.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Panel)
