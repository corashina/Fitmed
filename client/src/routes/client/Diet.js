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
    if (Object.keys(nextProps.diet).length !== 0) { this.setState({ diet: nextProps.diet }) }
    else this.props.history.push('/dieta/stworz')
  }
  componentDidMount() { this.props.getDiet(); }
  render() {
    return (
      <div>
        {Object.keys(this.state.diet).map((key) => <p>{key} - {this.state.diet[key]}</p>)}
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
