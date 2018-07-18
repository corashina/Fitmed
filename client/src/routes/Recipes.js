import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

export default class Users extends Component {
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
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.addIngredient = this.addIngredient.bind(this);
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

    axios.post('/api/recipes', newRecipe)
      .then(res => {
        this.setState({ errors: {}, name: '', calories: '', protein: '', fat: '', carbon: '', ingredients: '', execution: '', exclude: '' })
        this.getRecipes();
        window.M.toast({ html: "Recipe created" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });

  }
  onDelete(e) {
    axios.delete('/api/recipes', { params: { jwt: localStorage.getItem('jwt'), name: e } })
      .then(res => {
        this.getRecipes();
        window.M.toast({ html: "Recipe deleted" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });
  }
  getRecipes() {
    axios.get('/api/recipes', { params: { jwt: localStorage.getItem('jwt') } })
      .then(res => this.setState({ recipes: res.data }))
      .catch(err => this.props.history.push('/home'));
  }
  getProducts() {
    axios.get('/api/products', { params: { jwt: localStorage.getItem('jwt') } })
      .then(res => this.setState({ products: res.data }))
      .catch(err => this.props.history.push('/home'));
  }
  componentDidMount() {
    this.getRecipes();
    this.getProducts();
  }
  addIngredient(e) {
    this.setState({ ingredients: this.state.ingredients.concat(e) })
  }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row" >
          <form className="col s12" noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12 center">
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Add recipe</a>
              </div>
              <div id="modal1" className="modal">
                <div className="modal-content">
                  <h4 className="center">Add recipe</h4>
                  <div className="input-field col s12">
                    <input id="name" className={this.state.errors.name === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.name}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="calories" className={this.state.errors.calories === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Calories"
                      name="calories"
                      value={this.state.calories}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.calories}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="protein" className={this.state.errors.protein === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Protein"
                      name="protein"
                      value={this.state.protein}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.protein}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="fat" className={this.state.errors.fat === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Fat"
                      name="fat"
                      value={this.state.fat}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.fat}></span>
                  </div>
                  <div className="input-field col s3">
                    <input id="carbon" className={this.state.errors.carbon === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Carbon"
                      name="carbon"
                      value={this.state.carbon}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.carbon}></span>
                  </div>
                  <div className="input-field col s12">
                    <input id="execution" className={this.state.errors.execution === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Execution"
                      name="execution"
                      value={this.state.execution}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.execution}></span>
                  </div>
                  <div className="input-field col s12">
                    <input id="exclude" className={this.state.errors.exclude === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                      placeholder="Exclude"
                      name="exclude"
                      value={this.state.exclude}
                      onChange={this.onChange} />
                    <span className="helper-text" data-error={this.state.errors.exclude}></span>
                  </div>
                  <div className="input-field col s12">
                    <a className='dropdown-trigger btn' href='/' data-target='dropdown1'><i className="material-icons left">add_circle</i>Ingredients</a>
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
                    <table className="striped highlight">
                      <thead >
                        <tr>
                          <th>Name</th>
                          <th>Unit</th>
                          <th>Category</th>
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
                      Add recipe
							      </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        <table className="striped highlight">
          <thead >
            <tr>
              <th>Name</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Fat</th>
              <th>Carbon</th>
              <th>Ingredients</th>
              <th>Execution</th>
              <th>Exclude</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.recipes.map((recipe) =>
              <tr key={recipe.name}>
                <td>{recipe.name}</td>
                <td>{recipe.calories}</td>
                <td>{recipe.protein}</td>
                <td>{recipe.fat}</td>
                <td>{recipe.carbon}</td>
                <td>{recipe.ingredients}</td>
                <td>{recipe.execution}</td>
                <td>{recipe.exclude}</td>
                <td>
                  <a className="waves-effect waves-light btn-small red" onClick={(e) => this.onDelete(recipe.name)}>Delete</a>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div >
    )
  }
}