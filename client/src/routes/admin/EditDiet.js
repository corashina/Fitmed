import React, { Component } from 'react';
import { getDietById, addRecipeToDiet, deleteRecipeFromDiet } from '../../actions/dietActions';
import { getRecipes } from '../../actions/recipeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: {},
      recipes: [],
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      fields: ['time_01_monday', 'time_01_tuesday', 'time_01_wednesday', 'time_01_thursday', 'time_01_friday', 'time_01_saturday', 'time_01_sunday',
        'time_02_monday', 'time_02_tuesday', 'time_02_wednesday', 'time_02_thursday', 'time_02_friday', 'time_02_saturday', 'time_02_sunday',
        'time_03_monday', 'time_03_tuesday', 'time_03_wednesday', 'time_03_thursday', 'time_03_friday', 'time_03_saturday', 'time_03_sunday',
        'time_04_monday', 'time_04_tuesday', 'time_04_wednesday', 'time_04_thursday', 'time_04_friday', 'time_04_saturday', 'time_04_sunday'],
      selectedField: 'time_01_monday',
      searchByName: '',
      searchByCalories: 0,
      searchByProtein: 0,
      searchByFat: 0,
      searchByCarbon: 0,
      errors: {}
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }
  componentDidMount() {
    this.props.getRecipes();
    this.props.getDietById(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes) this.setState({ recipes: nextProps.recipes })
    if (nextProps.diet) this.setState({ diet: nextProps.diet })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  addRecipe(e, field) {
    this.props.addRecipeToDiet(e, this.props.match.params.id, field);
  }
  deleteRecipe(e, field) {
    this.props.deleteRecipeFromDiet(e, this.props.match.params.id, field);
  }
  render() {
    let filteredRecipes = this.state.recipes.filter(recipe => recipe.name.indexOf(this.state.searchByName) !== -1)
      .filter(recipe => recipe.calories > this.state.searchByCalories)
      .filter(recipe => recipe.protein > this.state.searchByProtein)
      .filter(recipe => recipe.fat > this.state.searchByFat)
      .filter(recipe => recipe.carbon > this.state.searchByCarbon)
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <ul className="tabs">
              <li className="tab col s3"><a href="#grafik">Grafik</a></li>
              <li className="tab col s3"><a href="#lista-zakupow">Lista zakupów</a></li>
              <li className="tab col s3"><a href="#komentarze">Komentarze</a></li>
              <li className="tab col s3"><a href="#opis-i-wlasciwosci">Opis i właściwości</a></li>
            </ul>
          </div>
          <div id="grafik">

            <ul id="slide-out" class="sidenav">
              <li>
                <div className="row">          <input placeholder="Nazwa przepisu" onChange={(e) => this.setState({ searchByName: e.target.value })} type="text" /></div>
                <div className="row"><input placeholder="Minimum kalorii" onChange={(e) => this.setState({ searchByCalories: e.target.value })} type="number" /></div>
                <div className="row"><input placeholder="Minimum białka" onChange={(e) => this.setState({ searchByProtein: e.target.value })} type="number" /></div>
                <div className="row"><input placeholder="Minimum tłuszczu" onChange={(e) => this.setState({ searchByFat: e.target.value })} type="number" /></div>
                <div className="row">
                  <input placeholder="Minimum weglowodanów" onChange={(e) => this.setState({ searchByCarbon: e.target.value })} type="number" />
                </div>

                <label for="recipe_name">Dostępne przepisy - {this.state.searchByCalories}</label>
                <div class="collection">
                  {filteredRecipes.map(e =>
                    <a class="collection-item" onClick={() => this.addRecipe(e.name, this.state.selectedField)}>{e.name}
                      <span class="new badge black" data-badge-caption="W">{e.carbon}</span>
                      <span class="new badge indigo" data-badge-caption="T">{e.fat}</span>
                      <span class="new badge green" data-badge-caption="B">{e.protein}</span>
                      <span class="new badge blue" data-badge-caption="Kcal">{e.calories}</span>
                    </a>)}
                </div>
              </li>
            </ul>

            <div className="row">
              {this.state.days.map((e, i) => <div key={i} className="col editDiet card-panel">{e}</div>)}
            </div>
            <div className="row">
              {this.state.fields.map(el =>
                <div key={el} className="col editDiet card-panel">
                  {this.state.diet[el] &&
                    <div>{this.state.diet[el].map(e =>
                      <span
                        key={e}
                        className="col s12">{e}
                        <a
                          onClick={() => this.deleteRecipe(e, el)}>
                          <i className="material-icons">delete</i>
                        </a>
                      </span>)}
                    </div>
                  }
                  <a
                    onClick={() => this.setState({ selectedField: el })}
                    className='sidenav-trigger btn-floating waves-effect waves-light btn-small editDiet-btn' data-target="slide-out">
                    <i className="material-icons">add</i>
                  </a>
                </div>
              )}
            </div>
          </div>


          <div id="lista-zakupow" className="col s12">

          </div>
          <div id="komentarze" className="col s12">

          </div>
          <div id="opis-i-wlasciwosci" className="col s12">

          </div>
        </div>
      </div >
    )
  }
}

EditDiet.propTypes = {
  getDietById: PropTypes.func.isRequired,
  addRecipeToDiet: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet,
  recipes: state.recipes
});

export default connect(mapStateToProps, { getDietById, addRecipeToDiet, getRecipes, deleteRecipeFromDiet })(EditDiet)

