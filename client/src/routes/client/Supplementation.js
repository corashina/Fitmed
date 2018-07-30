import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSupplementation } from '../../actions/supplementationActions';

class Supplementation extends Component {
  constructor() {
    super();
    this.state = {
      supplementation: {},
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.supplementation).length !== 0) { this.setState({ supplementation: nextProps.supplementation }) }
    else window.location.href = '/suplementacja/stworz';
  }
  componentDidMount() { this.props.getSupplementation(); }
  render() {
    return (
      <div>
        {Object.keys(this.state.supplementation).map((key) => <p>{key} - {this.state.supplementation[key]}</p>)}
      </div>
    )
  }
}

Supplementation.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  supplementation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  supplementation: state.supplementation
})

export default connect(mapStateToProps, { getSupplementation })(Supplementation)
