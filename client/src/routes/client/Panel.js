import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../actions/authActions';

class Panel extends Component {
  componentDidMount() { this.props.getUser(this.props.auth.user._id); }
  componentWillReceiveProps(nextProps) { if (!nextProps.auth.user.isVerified) alert("Potwierdz email") }
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
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { getUser })(Panel)
