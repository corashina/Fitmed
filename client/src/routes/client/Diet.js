import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDiet } from '../../actions/dietActions';
import { getRecipes } from '../../actions/recipeActions';

class Diet extends Component {
  constructor() {
    super();
    this.state = {
      days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
      fields: ['time_01_monday', 'time_01_tuesday', 'time_01_wednesday', 'time_01_thursday', 'time_01_friday', 'time_01_saturday', 'time_01_sunday',
        'time_02_monday', 'time_02_tuesday', 'time_02_wednesday', 'time_02_thursday', 'time_02_friday', 'time_02_saturday', 'time_02_sunday',
        'time_03_monday', 'time_03_tuesday', 'time_03_wednesday', 'time_03_thursday', 'time_03_friday', 'time_03_saturday', 'time_03_sunday',
        'time_04_monday', 'time_04_tuesday', 'time_04_wednesday', 'time_04_thursday', 'time_04_friday', 'time_04_saturday', 'time_04_sunday'],
      diet: {},
      recipes: [],
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.diet).length !== 0) { this.setState({ diet: nextProps.diet }) }
    else window.location.href = '/dieta/stworz';
    if (Array.isArray(nextProps.recipes)) this.setState({ recipes: nextProps.recipes })
  }
  componentDidMount() {
    this.props.getDiet();
    this.props.getRecipes();
  }
  getRecipe(e) {
    let recipe = this.state.recipes || this.state.recipes.filter(a => [...new Set(this.state.fields.map(a => this.state.diet[a]).reduce((a, b) => a.concat(b), []))].indexOf(e.name) >= 0)
    window.location.href = `/przepisy/${recipe.filter(a => a.name === e)[0]._id}`
  }
  render() {

    return (
      <div className="row">
        <div id="grafik">
          <div className="col left-panel">
            <div className="hour-item-sm card-panel">
              <span>Godzina</span>
            </div>
            <div className="hour-item card-panel">
              Śniadanie {this.state.diet.time_01}:00
            </div>
            <div className="hour-item card-panel">
              Drugie śniadanie {this.state.diet.time_02}:00
            </div>
            <div className="hour-item card-panel">
              Obiad {this.state.diet.time_03}:00
            </div>
            <div className="hour-item card-panel">
              Kolacja {this.state.diet.time_04}:00
            </div>
          </div>
          {this.state.days.map((e, i) => <div key={i} className="col editDiet-sm card-panel">{e}</div>)}
          {this.state.fields.map(el =>
            <div key={el} className="col editDiet card-panel">
              {this.state.diet[el] &&
                <div>{this.state.diet[el].map((e, i) =>
                  <span
                    key={i}
                    className="col s12 grey lighten-3">{e}
                    <a onClick={() => this.getRecipe(e)}>
                      <i className="material-icons right">search</i>
                    </a>
                  </span>)}
                </div>
              }
            </div>
          )}
        </div>
      </div>
    )
  }
}

Diet.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  diet: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet,
  recipes: state.recipes
})

export default connect(mapStateToProps, { getDiet, getRecipes })(Diet)
