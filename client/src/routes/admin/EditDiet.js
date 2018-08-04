import React, { Component } from 'react';
import { getDietById, addRecipeToDiet, deleteRecipeFromDiet, updateDietTime, addComment, deleteComment } from '../../actions/dietActions';
import { getProducts } from '../../actions/productActions';
import { getRecipes } from '../../actions/recipeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: {},
      recipes: [],
      products: [],
      days: ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'],
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
      addComment: '',
      errors: {}
    }
    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.getRecipes();
    this.props.getProducts();
    this.props.getDietById(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes) this.setState({ recipes: nextProps.recipes })
    if (nextProps.products) this.setState({ products: nextProps.products })
    if (nextProps.diet) this.setState({ diet: nextProps.diet })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  addRecipe(e, field) { this.props.addRecipeToDiet(e, this.props.match.params.id, field); }
  deleteRecipe(e, field) { this.props.deleteRecipeFromDiet(e, this.props.match.params.id, field) }
  onChange(e) { this.props.updateDietTime(e.target.value, this.props.match.params.id) }
  handleChange(e) { this.setState({ [e.target.name]: e.target.value }) }
  handleSubmit(event) {
    event.preventDefault();
    this.props.addComment(this.state.addComment, this.props.match.params.id)
  }
  deleteComment(e) { this.props.deleteComment(e, this.props.match.params.id) }
  render() {

    var shopping = this.state.recipes.filter(e => [...new Set(this.state.fields.map(e => this.state.diet[e]).reduce((a, b) => a.concat(b), []))].indexOf(e.name >= 0))

    var filteredRecipes = this.state.recipes
      .filter(recipe => recipe.name.toLowerCase().includes(this.state.searchByName.toLowerCase()))
      .filter(recipe => recipe.calories > this.state.searchByCalories)
      .filter(recipe => recipe.protein > this.state.searchByProtein)
      .filter(recipe => recipe.fat > this.state.searchByFat)
      .filter(recipe => recipe.carbon > this.state.searchByCarbon)

    return (
      <div>
        <div className="row">
          <div className="col s12" style={{ padding: '0' }}>
            <ul className="tabs">
              <li className="tab col s3"><a href="#grafik">Grafik</a></li>
              <li className="tab col s3"><a href="#lista-zakupow">Lista zakupów</a></li>
              <li className="tab col s3"><a href="#komentarze">Komentarze</a></li>
              <li className="tab col s3"><a href="#opis-i-wlasciwosci">Opis i właściwości</a></li>
            </ul>
          </div>

          <div id="grafik">
            <ul id="slide-out" className="sidenav">
              <li>
                <div className="row">
                  <input placeholder="Nazwa przepisu" onChange={(e) => this.setState({ searchByName: e.target.value })} type="text" />
                </div>
                <div className="row">
                  <input placeholder="Minimum kalorii" onChange={(e) => this.setState({ searchByCalories: e.target.value })} type="number" />
                </div>
                <div className="row">
                  <input placeholder="Minimum białka" onChange={(e) => this.setState({ searchByProtein: e.target.value })} type="number" />
                </div>
                <div className="row">
                  <input placeholder="Minimum tłuszczu" onChange={(e) => this.setState({ searchByFat: e.target.value })} type="number" />
                </div>
                <div className="row">
                  <input placeholder="Minimum weglowodanów" onChange={(e) => this.setState({ searchByCarbon: e.target.value })} type="number" />
                </div>

                <label htmlFor="recipe_name">Dostępne przepisy - {filteredRecipes.length}</label>
                <div className="collection">
                  {filteredRecipes.map(e =>
                    <a key={e.name} className="collection-item" onClick={() => this.addRecipe(e.name, this.state.selectedField)}>{e.name}
                      <span className="new badge black" data-badge-caption="W">{e.carbon}</span>
                      <span className="new badge indigo" data-badge-caption="T">{e.fat}</span>
                      <span className="new badge green" data-badge-caption="B">{e.protein}</span>
                      <span className="new badge blue" data-badge-caption="Kcal">{e.calories}</span>
                    </a>)}
                </div>
              </li>
            </ul>
            <div className="col left-panel">
              <div className="hour-item-sm card-panel">
                <span>Godzina</span>
              </div>
              <div className="hour-item card-panel">
                <div className="input-field col s12">
                  <select value={this.state.diet.time_01} defaultValue={this.state.diet.time_01} onChange={this.onChange}>
                    <option disabled selected>Zmień godzine</option>
                    {[7, 8, 9, 10].map(e => <option key={e} value={e}>{e}:00</option>)}
                  </select>
                  <label>Śniadanie {this.state.diet.time_01}:00</label>
                </div>
              </div>
              <div className="hour-item card-panel">
                <div className="input-field col s12">
                  <select value={this.state.diet.time_02} onChange={this.onChange} defaultValue={this.state.diet.time_02}>
                    <option disabled selected>Zmień godzine</option>
                    {[11, 12, 13, 14].map(e => <option key={e} value={e}>{e}:00</option>)}
                  </select>
                  <label>Drugie śniadanie {this.state.diet.time_02}:00</label>
                </div>

              </div>
              <div className="hour-item card-panel">
                <div className="input-field col s12">
                  <select value={this.state.diet.time_03} onChange={this.onChange} defaultValue={this.state.diet.time_03}>
                    <option disabled selected>Zmień godzine</option>
                    {[15, 16, 17, 18].map(e => <option key={e} value={e}>{e}:00</option>)}
                  </select>
                  <label>Obiad {this.state.diet.time_03}:00</label>
                </div>
              </div>
              <div className="hour-item card-panel">
                <div className="input-field col s12">
                  <select value={this.state.diet.time_04} onChange={this.onChange} defaultValue={this.state.diet.time_04}>
                    <option disabled selected>Zmień godzine</option>
                    {[19, 20, 21, 22].map(e => <option key={e} value={e}>{e}:00</option>)}
                  </select>
                  <label>Kolacja {this.state.diet.time_04}:00</label>
                </div>
              </div>
            </div>
            {this.state.days.map((e, i) => <div key={i} className="col editDiet-sm card-panel">{e}</div>)}
            {this.state.fields.map(el =>
              <div key={el} className="col editDiet card-panel">
                {this.state.diet[el] &&
                  <div>{this.state.diet[el].map(e =>
                    <span
                      key={e}
                      className="col s12 grey lighten-3">{e}
                      <a
                        onClick={() => this.deleteRecipe(e, el)}>
                        <i className="material-icons red-text right">remove_circle</i>
                      </a>
                    </span>)}
                  </div>
                }
                <a
                  onClick={() => this.setState({ selectedField: el })}
                  className='sidenav-trigger'
                  data-target="slide-out">
                  <i className="material-icons green-text right">add_circle</i>
                </a>
              </div>
            )}
          </div>
          <div id="lista-zakupow" className="col s6 offset-s3">
            {shopping.map((e, i) =>
              <div key={i} className="collection" style={{ border: 'none' }}>
                <a key={e.name} className="collection-item teal white-text">{e.name}
                  <span className="new badge black" data-badge-caption="Węglowodany">{e.carbon}</span>
                  <span className="new badge indigo" data-badge-caption="Tłuszcz">{e.fat}</span>
                  <span className="new badge green" data-badge-caption="Białko">{e.protein}</span>
                  <span className="new badge blue" data-badge-caption="Kcal">{e.calories}</span>
                </a>
                <div className="collection">
                  {e.ingredients.map((el, i) =>
                    <a key={i} className="collection-item">{el.name}
                      <span className="new badge orange" data-badge-caption="">{el.category}</span>
                      <span className="new badge purple" data-badge-caption="">{el.unit}</span>
                    </a>
                  )}
                </div>
              </div>
            )}

          </div>
          <div id="komentarze" className="col s6 offset-s3 input-field">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <input name="addComment" placeholder="Dodaj komentarz" type="text" onChange={this.handleChange} />
              </div>
              <div className="row">
                <button className="btn waves-effect waves-light col s12 green" type="submit" onSubmit={this.handleSubmit}>Dodaj</button>
              </div>
            </form>
            <ul className="collection">
              {this.state.diet.comments &&
                this.state.diet.comments.map(e =>
                  <li className="collection-item card-panel grey lighten-4">
                    <a className="btn-floating secondary-content red" onClick={() => this.deleteComment(e.data)}><i className="material-icons">close</i></a>
                    <b><p>{e.date.split('T')[0]}</p></b>
                    <p>{e.data}</p>
                  </li>
                )}
            </ul>
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
  getProducts: PropTypes.func.isRequired,
  updateDietTime: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  products: state.products,
  diet: state.diet,
  recipes: state.recipes
});

export default connect(mapStateToProps, { getDietById, addRecipeToDiet, getRecipes, deleteRecipeFromDiet, getProducts, updateDietTime, addComment, deleteComment })(EditDiet)

