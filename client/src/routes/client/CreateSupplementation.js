import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postSupplementation } from '../../actions/supplementationActions';

class CreateSupplementation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aim: ['Redukcja tkanki tłuszczowej', 'Zyskanie masy', 'Utrzymanie masy ciała'],
      allergies: ['Gluten', 'Jaja', 'Ryby', 'Orzechy', 'Produkty mleczne', 'Soja', 'Seler', 'Gorczyca', 'Łubin', 'Mięczaki', 'Orzeszki ziemne', 'Inne...'],
      illnesses: ['Cukrzyca typu 1', 'Cukrzyca typu 2', 'Hashimoto', 'Graves-Basedow', 'Reumatoidalne zapalenie stawów', 'Choroba Leśniewskiego-Crohna', 'Wrzodziejące zapalenie jelita grubego', 'Toczeń', 'Stwardnienie rozsiane', 'Niedoczynność tarczycy', 'Zespół jelita drażliwego', 'Inne'],
      afflictions: ['Biegunki', 'Wzdęcia', 'Bóle głowy', 'Przewlekła senność', 'Inne'],
      height: '',
      weight: '',
      meals: '',
      selectedAim: 'Redukcja tkanki tłuszczowej',
      selectedAllergies: [],
      selectedIllnesses: [],
      selectedAfflictions: [],
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    const newSupplementation = {
      height: this.state.height,
      weight: this.state.weight,
      meals: this.state.meals,
      selectedAim: this.state.selectedAim,
      selectedAllergies: this.state.selectedAllergies,
      selectedIllnesses: this.state.selectedIllnesses,
      selectedAfflictions: this.state.selectedAfflictions,
    };

    this.props.postSupplementation(newSupplementation, this.props.history);
  }
  addItem(e) {
    if (!this.state[e.target.name].includes(e.target.value)) {
      this.setState({ [e.target.name]: [...this.state[e.target.name], e.target.value] })
    }
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onDelete(e, i) { this.setState({ [e]: this.state[e].filter(el => i !== el) }) }
  componentWillReceiveProps(nextProps) { if (nextProps.errors) this.setState({ errors: nextProps.errors }) }
  render() {
    const { errors } = this.state
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="col s12 card-center">
            <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
                  <div className="row">
                    <div className="input-field col s4">
                      <input
                        id="height"
                        className={errors.height === undefined ? '' : 'invalid'}
                        type="text"
                        autoComplete="off"
                        placeholder="Wzrost"
                        name="height"
                        value={this.state.height}
                        onChange={this.onChange} />
                      <span className="helper-text" data-error={errors.height}></span>
                    </div>
                    <div className="input-field col s4">
                      <input
                        id="weight"
                        type="text"
                        autoComplete="off"
                        className={errors.weight === undefined ? '' : 'invalid'}
                        placeholder="Waga"
                        name="weight"
                        value={this.state.weight}
                        onChange={this.onChange} />
                      <span className="helper-text" data-error={errors.weight}></span>
                    </div>
                    <div className="input-field col s4">
                      <input
                        id="meals"
                        type="text"
                        autoComplete="off"
                        className={errors.meals === undefined ? '' : 'invalid'}
                        placeholder="Ilość posiłków dziennie"
                        name="meals"
                        value={this.state.meals}
                        onChange={this.onChange} />
                      <span className="helper-text" data-error={errors.meals}></span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select>
                        {this.state.aim.map((e, i) => <option key={i} value={i}>{e}</option>)}
                      </select>
                      <label>Jaki jest twój cel?</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s4">
                      <select name="selectedAllergies" onChange={this.addItem}>
                        {this.state.allergies.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Czy masz na cos alergie?</label>
                    </div>
                    <div className="input-field col s4">
                      <select name="selectedIllnesses" onChange={this.addItem}>
                        {this.state.illnesses.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Czy masz jakąś chorobę?</label>
                    </div>
                    <div className="input-field col s4">
                      <select name="selectedAfflictions" onChange={this.addItem}>
                        {this.state.afflictions.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Czy masz jakies dolegliwości</label>
                    </div>
                    <div className="input-field col s4">
                      <ul className="collection">
                        {this.state.selectedAllergies.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedAllergies", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <ul className="collection">
                        {this.state.selectedIllnesses.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedIllnesses", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <ul className="collection">
                        {this.state.selectedAfflictions.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedAfflictions", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        className="btn waves-effect waves-light"
                        style={{ width: '100%' }}
                        type="submit"
                        name="action">
                        Potwierdź
					          </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div >
    )
  }
}

CreateSupplementation.propTypes = {
  postSupplementation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  supplementation: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  supplementation: state.supplementation
})

export default connect(mapStateToProps, { postSupplementation })(CreateSupplementation)
