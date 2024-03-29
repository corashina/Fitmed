import React, { Component } from 'react'
import { getRecipes, addRecipe, deleteRecipe } from '../../actions/recipeActions';
import { getProducts } from '../../actions/productActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Recipes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      calories: '',
      protein: '',
      fat: '',
      carbon: '',
      ingredients: [],
      execution: '',
      exclude: '',
      recipes: [],
      products: [],
      sortByName: false,
      sortByCalories: false,
      sortByProtein: false,
      sortByFat: false,
      sortByCarb: false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onSubmit(e) {
    e.preventDefault();

    const newRecipe = {
      name: this.state.name,
      calories: this.state.calories,
      protein: this.state.protein,
      fat: this.state.fat,
      carbon: this.state.carbon,
      ingredients: this.state.ingredients,
      execution: this.state.execution,
      exclude: this.state.exclude,
      recipes: [],
      errors: {}
    };

    this.props.addRecipe(newRecipe);
  }
  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.recipes)) this.setState({ recipes: nextProps.recipes })
    if (Array.isArray(nextProps.products)) this.setState({ products: nextProps.products })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  componentDidMount() {
    this.props.getRecipes();
    this.props.getProducts();
  }
  addIngredient(e) {
    this.setState({ ingredients: this.state.ingredients.concat(e) })
  }
  handleChange(e) {
    this.setState({ sortByName: false })
    this.setState({ sortByCalories: false })
    this.setState({ sortByProtein: false })
    this.setState({ sortByFat: false })
    this.setState({ sortByCarb: false })
    this.setState({ [e.target.value]: true })
  }
  render() {
    let filteredRecipes = this.state.sortByName === true ? this.state.recipes.sort((a, b) => a.name < b.name) : this.state.recipes;

    filteredRecipes = this.state.sortByCalories === true ? this.state.recipes.sort((a, b) => a.calories < b.calories) : this.state.recipes;

    filteredRecipes = this.state.sortByProtein === true ? this.state.recipes.sort((a, b) => a.protein < b.protein) : this.state.recipes;

    filteredRecipes = this.state.sortByFat === true ? this.state.recipes.sort((a, b) => a.fat < b.fat) : this.state.recipes;

    filteredRecipes = this.state.sortByCarb === true ? this.state.recipes.sort((a, b) => a.carbon < b.carbon) : this.state.recipes;

    return (
      <div>
        <div className="row">
          <div className="col s3 card-panel">
            <div className="row">
              <div className="input-field col s12">
                <a className="waves-effect waves-light btn modal-trigger" style={{ width: '100%' }} href="#modal1">Dodaj przepis</a>
              </div>
            </div>
            <div className="row">
              <label className="col s12">
                <input name="group1" type="radio" type="radio" value="sortByName" checked={this.state.sortByName} onChange={this.handleChange} />
                <span>Sortuj po nazwie</span>
              </label>
            </div>
            <div className="row">
              <label className="col s12">
                <input name="group1" type="radio" value="sortByCalories" checked={this.state.sortByCalories} onChange={this.handleChange} />
                <span>Sortuj po kaloriach</span>
              </label>
            </div>
            <div className="row">
              <label className="col s12">
                <input name="group1" type="radio" value="sortByProtein" checked={this.state.sortByProtein} onChange={this.handleChange} />
                <span>Sortuj po białku</span>
              </label>
            </div>
            <div className="row">
              <label className="col s12">
                <input name="group1" type="radio" value="sortByFat" checked={this.state.sortByFat} onChange={this.handleChange} />
                <span>Sortuj po tłuszczu</span>
              </label>
            </div>
            <div className="row">
              <label className="col s12">
                <input name="group1" type="radio" value="sortByCarb" checked={this.state.sortByCarb} onChange={this.handleChange} />
                <span>Sortuj po węglowodanach</span>
              </label>
            </div>
          </div>
          <div className="col s9">
            <table className="striped highlight">
              <thead >
                <tr>
                  <th>Nazwa</th>
                  <th>Kalorie</th>
                  <th>Białko</th>
                  <th>Tłuszcz</th>
                  <th>Węglowodany</th>
                  <th>Składniki</th>
                  <th>Przepis</th>
                  <th>Cechy wykluczające</th>
                  <th>Usuń</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecipes.map((recipe) =>
                  <tr key={recipe.name}>
                    <td>{recipe.name}</td>
                    <td>{recipe.calories}</td>
                    <td>{recipe.protein}</td>
                    <td>{recipe.fat}</td>
                    <td>{recipe.carbon}</td>
                    <td>{recipe.ingredients.map((e, i) => <span key={i}>{e.name} </span>)}</td>
                    <td>{recipe.execution}</td>
                    <td>{recipe.exclude}</td>
                    <td>
                      <a className="btn-floating waves-effect waves-light btn-small red" onClick={(e) => this.props.deleteRecipe(recipe.name)}><i className="material-icons">close</i></a>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row" >
          <form className="col s12" noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4 className="center">Dodaj przepis</h4>
                  <div className="input-field col s12">
                    <input id="name" className={this.state.errors.name === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Nazwa"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.name}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="calories" className={this.state.errors.calories === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Kalorie"
                      name="calories"
                      value={this.state.calories}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.calories}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="protein" className={this.state.errors.protein === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Białko"
                      name="protein"
                      value={this.state.protein}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.protein}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="fat" className={this.state.errors.fat === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Tłuszcz"
                      name="fat"
                      value={this.state.fat}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.fat}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="carbon" className={this.state.errors.carbon === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Węglowodany"
                      name="carbon"
                      value={this.state.carbon}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.carbon}></span>
                  </div>
                  <div className="input-field col s12">
                    <input id="execution" className={this.state.errors.execution === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Przepis"
                      name="execution"
                      value={this.state.execution}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.execution}></span>
                  </div>
                  <div className="input-field col s12">
                    <input id="exclude" className={this.state.errors.exclude === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Cechy wykluczające"
                      name="exclude"
                      value={this.state.exclude}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.exclude}></span>
                  </div>
                  <div className="input-field col s12">
                    <a className='dropdown-trigger btn' href='/' data-target='dropdown1'><i className="material-icons left">add_circle</i>Składniki</a>
                    <ul id='dropdown1' className='dropdown-content'>
                      {this.state.products.map((product) =>
                        <li key={product.name} onClick={(e) => this.addIngredient(product)}>
                          <a>{product.name}</a>
                        </li>
                      )}
                    </ul>
                    <span className="helper-text" data-error={this.state.errors.ingredients}></span>
                  </div>
                  <div className="input-field col s12">
                    <table className="striped highlight centered">
                      <thead >
                        <tr>
                          <th>Nazwa</th>
                          <th>Jednostka</th>
                          <th>Kategoria</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.ingredients.map((ing) =>
                          <tr key={ing.name}>
                            <td>{ing.name}</td>
                            <td>{ing.unit}</td>
                            <td>{ing.category}</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="input-field col s12">
                    <button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">
                      Dodaj przepis
							      </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div >
    )
  }
}

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  data: state.data,
  recipes: state.recipes,
  products: state.products
});

export default connect(mapStateToProps, { getRecipes, addRecipe, deleteRecipe, getProducts })(Recipes)
