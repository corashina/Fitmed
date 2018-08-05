import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiet } from '../../actions/dietActions';

class Diet extends Component {
  constructor() {
    super();
    this.state = {
      diet: {},
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.diet).length !== 0) { this.setState({ diet: nextProps.diet }) }
    else window.location.href = '/dieta/stworz';
  }
  componentDidMount() { this.props.getDiet(); }
  render() {
    return (
      <div>
        {Object.keys(this.state.diet).map((e) => <p>{e}</p>)}
      </div>
    )
  }
}

Diet.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  diet: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet
})

export default connect(mapStateToProps, { getDiet })(Diet)
