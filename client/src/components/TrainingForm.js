import React, { Component } from 'react';
import axios from 'axios';

export default class TrainingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allergies:
        [
          'Gluten',
          'Jaja',
          'Ryby',
          'Orzechy',
          'Produkty mleczne',
          'Soja',
          'Seler',
          'Gorczyca',
          'Łubin',
          'Mięczaki',
          'Orzeszki ziemne',
          'Inne...'
        ],
      experience:
        [
          'Dopiero zaczynam',
          '6-12 miesięcy',
          '1-2 lata',
          '2-4 lata',
          '4-6 lat',
          '6-8 lat',
          'Więcej niż osiem lat'
        ],
      illnesses:
        [
          'Cukrzyca typu 1',
          'Cukrzyca typu 2',
          'Hashimoto',
          'Graves-Basedow',
          'Reumatoidalne zapalenie stawów',
          'Choroba Leśniewskiego-Crohna',
          'Wrzodziejące zapalenie jelita grubego',
          'Toczeń',
          'Stwardnienie rozsiane',
          'Niedoczynność tarczycy',
          'Zespół jelita drażliwego',
          'Inne'
        ],
      afflictions:
        [
          'Biegunki',
          'Wzdęcia',
          'Bóle głowy',
          'Przewlekła senność',
          'Inne'
        ],
      frequencyQuesion:
        [
          'Nie jem mięsa',
          'Bardzo rzadko (raz na dwa tygodnie)',
          'Rzadko (raz na tydzien)',
          'Umiarkowanie (2-3 razy w tygodniu)',
          'Często (4-6 razy w tygodniu)',
          'Bardzo często (codziennie)'
        ],
      height: '',
      weight: '',
      trainings: '',
      selectedAim: 'Redukcja tkanki tłuszczowej',
      selectedAllergies: [],
      selectedIllnesses: [],
      selectedAfflictions: [],
      selectedMeatQuestion: 'Nie jem mięsa',
      products: [],
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    const newSupplementation = {
      auth: localStorage.getItem('jwt'),
      height: this.state.height,
      weight: this.state.weight,
      meals: this.state.meals,
      selectedAim: this.state.selectedAim,
      selectedAllergies: this.state.selectedAllergies,
      selectedIllnesses: this.state.selectedIllnesses,
      selectedAfflictions: this.state.selectedAfflictions,
    };

    axios
      .post('/api/users/supplementation', newSupplementation)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err.response)
        this.setState({ errors: err.response.data })
      })
  }
  addItem(e) {
    if (!this.state[e.target.name].includes(e.target.value)) {
      this.setState({ [e.target.name]: [...this.state[e.target.name], e.target.value] })
    }
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onDelete(e, allergy) { this.setState({ [e]: this.state[e].filter(el => allergy !== el) }) }
  componentDidMount() {
    axios.get('/api/products')
      .then(res => { this.setState({ products: res.data }) })
      .catch(err => this.setState({ errors: err.response.data }))
  }
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
                        id="trainings"
                        type="text"
                        autoComplete="off"
                        className={errors.trainings === undefined ? '' : 'invalid'}
                        placeholder="Ilość treningów tygodniowo"
                        name="trainings"
                        value={this.state.trainings}
                        onChange={this.onChange} />
                      <span className="helper-text" data-error={errors.trainings}></span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <select>
                        {this.state.experience.map((e, i) => <option key={i} value={i}>{e}</option>)}
                      </select>
                      <label>Staż</label>
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
                      <a className='dropdown-trigger btn' data-target='dropdown1'>Jakiego nie lubisz?</a>
                      <ul id='dropdown1' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Mieso').map((el, i) =>
                          <li key={i}><a>{el.name}</a></li>
                        )}
                      </ul>
                    </div>
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
        </form>
      </div >
    )
  }
}
