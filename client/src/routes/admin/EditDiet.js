import React, { Component } from 'react'
import { getDietById, addRecipeToDiet } from '../../actions/dietActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditDiet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diet: {},
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      errors: {}
    }
  }
  componentDidMount() { this.props.getDietById(this.props.match.params.id) }
  componentWillReceiveProps(nextProps) {
    if (nextProps.diet) this.setState({ diet: nextProps.diet })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  render() {
    const { diet } = this.state;
    return (
      <div>
        <div class="row">
          <div class="col s12">
            <ul class="tabs">
              <li class="tab col s3"><a href="#grafik">Grafik</a></li>
              <li class="tab col s3"><a href="#lista-zakupow">Lista zakupów</a></li>
              <li class="tab col s3"><a href="#komentarze">Komentarze</a></li>
              <li class="tab col s3"><a href="#opis-i-wlasciwosci">Opis i właściwości</a></li>
            </ul>
          </div>
          <div id="grafik">
            <div class="row">
              <div class="col editDiet"></div>
              {this.state.days.map(e => <div class="col" style={{ width: '12.5%' }}>{e}</div>)}
            </div>
            <div class="row">
              <div class="col editDiet"></div>
              <div class="col editDiet">{diet.time_01_monday}
                <a class="btn-floating waves-effect waves-light"><i onClick={() => { this.props.addRecipeToDiet('diet.time_01_monday', diet._id) }} class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_tuesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_wednesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_thursday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_friday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_saturday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_01_sunday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
            </div>
            <div class="row">
              <div class="col editDiet"></div>
              <div class="col editDiet">{diet.time_02_monday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_tuesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_wednesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_thursday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_friday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_saturday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_02_sunday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
            </div>
            <div class="row">
              <div class="col editDiet"></div>
              <div class="col editDiet">{diet.time_03_monday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_tuesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_wednesday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_thursday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_friday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_saturday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
              <div class="col editDiet">{diet.time_03_sunday}
                <a class="btn-floating waves-effect waves-light"><i class="material-icons">add</i></a>
              </div>
            </div>
            <div class="row">
              <div class="col editDiet"></div>
              <div class="col editDiet">{diet.time_04_monday}

              </div>
              <div class="col editDiet">{diet.time_04_tuesday}

              </div>
              <div class="col editDiet">{diet.time_04_wednesday}

              </div>
              <div class="col editDiet">{diet.time_04_thursday}

              </div>
              <div class="col editDiet">{diet.time_04_friday}

              </div>
              <div class="col editDiet">{diet.time_04_saturday}

              </div>
              <div class="col editDiet">{diet.time_04_sunday}

              </div>
            </div>
          </div>


          <div id="lista-zakupow" class="col s12">

          </div>
          <div id="komentarze" class="col s12">
            {this.state.errors.diet}
            {Object.keys(this.state.diet).map((key, i) => <p key={i}>{key} - {this.state.diet[key]}</p>)}
          </div>
          <div id="opis-i-wlasciwosci" class="col s12">

          </div>
        </div>
      </div >
    )
  }
}

EditDiet.propTypes = {
  getDietById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  diet: state.diet
});

export default connect(mapStateToProps, { getDietById, addRecipeToDiet })(EditDiet)

