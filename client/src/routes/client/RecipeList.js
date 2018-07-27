import React, { Component } from 'react'
import { getRecipes } from '../../actions/recipeActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.recipes.recipes)) this.setState({ recipes: nextProps.recipes.recipes })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  componentDidMount() {
    this.props.getRecipes();
  }
  render() {
    return (
      <div>
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
            {this.state.recipes.map((recipe) =>
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
                  <a className="waves-effect waves-light btn-small red" onClick={(e) => this.props.deleteRecipe(recipe.name)}><i className="material-icons">close</i></a>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div >
    )
  }
}

RecipeList.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  recipes: state.recipes
});

export default connect(mapStateToProps, { getRecipes })(RecipeList)
