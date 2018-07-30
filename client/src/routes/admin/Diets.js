import React, { Component } from 'react'
import { getDiets } from '../../actions/dietActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Diets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: []
    }
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.diet)) this.setState({ diet: nextProps.diet });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }
  componentDidMount() { this.props.getDiets(); }
  render() {
    return (
      <div>
        <table className="striped highlight centered">
          <thead >
            <tr>
              <th>Uzytkownik</th>
              <th>Wzrost</th>
              <th>Waga</th>
              <th>Cel</th>
            </tr>
          </thead>
          <tbody>
            {this.state.diet.map((diet, i) =>
              <tr key={i}>
                <td>{diet.email}</td>
                <td>{diet.height}</td>
                <td>{diet.weight}</td>
                <td>{diet.selectedAim}</td>
              </tr>)}
          </tbody>
        </table>
      </div >
    )
  }
}

Diets.propTypes = {
  getDiets: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet
});

export default connect(mapStateToProps, { getDiets })(Diets)
