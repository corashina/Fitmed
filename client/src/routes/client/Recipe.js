import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipe } from '../../actions/recipeActions';

class Recipe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipe: {}
    }
  }
  componentDidMount() { this.props.getRecipe(this.props.match.params.id) }
  componentWillReceiveProps(nextProps) {
    if (nextProps.recipes) this.setState({ recipe: nextProps.recipes })
  }
  render() {
    return (
      <div className="row">
        <div className="col s6 offset-s3 card-panel">
          <p>Nazwa - {this.state.recipe.name}</p>
          <p>Kalorie - {this.state.recipe.calories}</p>
          <p>Białko - {this.state.recipe.protein}</p>
          <p>Tłuszcz - {this.state.recipe.fat}</p>
          <p>Węglowodany - {this.state.recipe.carbon}</p>
          <p>Cechy wykluczające - {this.state.recipe.exclude}</p>
          <p>Przepis - {this.state.recipe.execution}</p>
          {Array.isArray(this.state.recipe.ingredients) &&
            this.state.recipe.ingredients.map((e, i) => <span key={i}>{e.name} </span>)
          }
        </div>
      </div>
    )
  }
}

Recipe.propTypes = {
  getRecipe: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  recipes: state.recipes
})

export default connect(mapStateToProps, { getRecipe })(Recipe)
