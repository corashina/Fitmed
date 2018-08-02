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
            <div className="row">
              {this.state.days.map((e, i) => <div key={i} className="col editDiet card-panel">{e}</div>)}
            </div>
            <div className="row">
              {this.state.fields.map(el =>
                <div key={el} className="col editDiet card-panel">
                  {this.state.diet[el] &&
                    <div>{this.state.diet[el].map(e =>
                      <span key={e} className="col s12">{e}<a onClick={() => this.deleteRecipe(e, el)}>
                        <i className="material-icons">delete</i></a>
                      </span>)}
                    </div>
                  }
                  <a className='dropdown-trigger btn-floating waves-effect waves-light btn-small editDiet-btn' data-target={el}><i className="material-icons">add</i></a>
                  <ul id={el} className='dropdown-content'>
                    {this.state.recipes.map((e, i) => <li key={i} value={e.name} onClick={() => this.addRecipe(e.name, el)} ><a>{e.name}</a></li>)}
                  </ul>
                </div>
              )}

              {/* <div className="col editDiet card-panel">
                {this.state.diet.time_01_tuesday &&
                  <div>{this.state.diet.time_01_tuesday.map(e =>
                    <span className="col s12">{e}<a onClick={() => this.deleteRecipe(e, 'time_01_tuesday')}>
                      <i className="material-icons">delete</i></a>
                    </span>)}
                  </div>
                }
                <a className='dropdown-trigger btn-floating waves-effect waves-light' data-target='dropdown2'><i className="material-icons">add</i></a>
                <ul id='dropdown2' className='dropdown-content'>
                  {this.state.recipes.map((e, i) => <li key={i} value={e.name} onClick={() => this.addRecipe(e.name, 'time_01_tuesday')} ><a>{e.name}</a></li>)}
                </ul>
              </div>
              <div className="col editDiet card-panel">
                {this.state.diet.time_01_wednesday &&
                  <div>{this.state.diet.time_01_wednesday.map(e =>
                    <span className="col s12">{e}<a onClick={() => this.deleteRecipe(e, 'time_01_wednesday')}>
                      <i className="material-icons">delete</i></a>
                    </span>)}
                  </div>
                }
                <a className='dropdown-trigger btn-floating waves-effect waves-light' data-target='dropdown3'><i className="material-icons">add</i></a>
                <ul id='dropdown3' className='dropdown-content'>
                  {this.state.recipes.map((e, i) => <li key={i} value={e.name} onClick={() => this.addRecipe(e.name, 'time_01_wednesday')} ><a>{e.name}</a></li>)}
                </ul>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_01_thursday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_01_friday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_01_saturday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_01_sunday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
            </div>
            <div className="row">
              <div className="col editDiet card-panel"></div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_monday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_tuesday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_wednesday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_thursday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet">{this.state.diet.time_02_friday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_saturday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_02_sunday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
            </div>
            <div className="row">
              <div className="col editDiet card-panel"></div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_monday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_tuesday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_wednesday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_thursday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_friday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_saturday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_03_sunday}
                <a className="btn-floating waves-effect waves-light"><i className="material-icons">add</i></a>
              </div>
            </div>
            <div className="row">
              <div className="col editDiet card-panel"></div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_monday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_tuesday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_wednesday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_thursday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_friday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_saturday}

              </div>
              <div className="col editDiet card-panel">{this.state.diet.time_04_sunday}

              </div> */}
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

