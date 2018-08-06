import React, { Component } from 'react'
import { confirmEmail } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ConfirmEmail extends Component {
  componentDidMount() { this.props.confirmEmail(this.props.match.params.token) }
  componentWillReceiveProps(nextProps) { if (nextProps.auth.user.isVerified) window.location.href = "/panel" }
  render() {
    return (
      <div>
        {this.props.match.params.token}
      </div>
    )
  }
}

ConfirmEmail.propTypes = {
  confirmEmail: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { confirmEmail })(ConfirmEmail)
