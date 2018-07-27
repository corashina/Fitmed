import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiet } from '../../actions/dietActions';

class Diet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: {},
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.diet).length !== 0) this.setState({ diet: nextProps.diet })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  componentDidMount() {
    this.props.getDiet();
    if (Object.keys(this.props.diet).length === 0) this.props.history.push('/dieta/stworz');
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

Diet.propTypes = {
  auth: PropTypes.object.isRequired,
  diet: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  diet: state.diet
})

export default connect(mapStateToProps, { getDiet })(Diet)
