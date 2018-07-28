import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { postDiet } from '../../actions/dietActions';
import { getProducts } from '../../actions/productActions';

class CreateDiet extends Component {
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
          'Orzeszki ziemne'
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
          'Zespół jelita drażliwego'
        ],
      afflictions:
        [
          'Biegunki',
          'Wzdęcia',
          'Bóle głowy',
          'Przewlekła senność',
        ],
      frequencyQuesion:
        [
          'Nie jem',
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
      selectedMeatFrequency: 'Nie jem',
      selectedFishFrequency: 'Nie jem',
      selectedNutsFrequency: 'Nie jem',
      selectedFruitFrequency: 'Nie jem',
      selectedVegetableFrequency: 'Nie jem',
      selectedMeat: [],
      selectedFish: [],
      selectedNuts: [],
      selectedFruit: [],
      selectedVegetable: [],
      products: [],
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addProduct = this.addProduct.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();

    const newDiet = {
      height: this.state.height,
      weight: this.state.weight,
      trainings: this.state.trainings,
      selectedAim: this.state.selectedAim,
      selectedAllergies: this.state.selectedAllergies,
      selectedIllnesses: this.state.selectedIllnesses,
      selectedAfflictions: this.state.selectedAfflictions,
      selectedMeatFrequency: this.state.selectedMeatFrequency,
      selectedMeat: this.state.selectedMeat,
      selectedFishFrequency: this.state.selectedFishFrequency,
      selectedFish: this.state.selectedFish,
      selectedNutsFrequency: this.state.selectedNutsFrequency,
      selectedNuts: this.state.selectedNuts,
      selectedVegetableFrequency: this.state.selectedVegetableFrequency,
      selectedVegetable: this.state.selectedVegetable,
      selectedFruitFrequency: this.state.selectedFruitFrequency,
      selectedFruit: this.state.selectedFruit,
    };

    this.props.postDiet(newDiet, this.props.history);
  }
  addItem(e) {
    if (!this.state[e.target.name].includes(e.target.value)) {
      this.setState({ [e.target.name]: [...this.state[e.target.name], e.target.value] })
    }
  }
  addProduct(e, product) {
    if (!this.state[e.target.name].includes(product.name)) {
      this.setState({ [e.target.name]: [...this.state[e.target.name], product.name] })
    }
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onDelete(e, i) { this.setState({ [e]: this.state[e].filter(el => i !== el) }) }
  componentWillReceiveProps(nextProps) {
    if (nextProps.products) this.setState({ products: nextProps.products })
    if (nextProps.errors) this.setState({ errors: nextProps.errors })
  }
  componentDidMount() {
    this.props.getProducts();
  }
  render() {
    const { errors } = this.state
    return (
      <div>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="col s12" style={{ padding: '2% 20%' }}>
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
                    <div className="input-field col s4">
                      <select name="selectedMeatFrequency" onChange={this.onChange}>
                        {this.state.frequencyQuesion.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Mięso</label>
                    </div>
                    <div className="input-field col s4">
                      <select name="selectedFishFrequency" onChange={this.addItem}>
                        {this.state.frequencyQuesion.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Ryby</label>
                    </div>
                    <div className="input-field col s4">
                      <select name="selectedNutsFrequency" onChange={this.addItem}>
                        {this.state.frequencyQuesion.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Orzechy</label>
                    </div>


                    <div className="input-field col s4">
                      <a className='dropdown-trigger btn' data-target='dropdown1' style={{ width: '100%' }}>Jakiego nie lubisz?</a>
                      <ul id='dropdown1' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Mieso').map((product, i) =>
                          <li key={i} value={product.name} onClick={(e) => this.addProduct(e, product)}>
                            <a name='selectedMeat'>{product.name}</a>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <a className='dropdown-trigger btn' data-target='dropdown2' style={{ width: '100%' }}>Jakiego nie lubisz?</a>
                      <ul id='dropdown2' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Ryby').map((product, i) =>
                          <li key={i} value={product.name} onClick={(e) => this.addProduct(e, product)}>
                            <a name='selectedFish'>{product.name}</a>
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <a className='dropdown-trigger btn' data-target='dropdown3' style={{ width: '100%' }}>Jakiego nie lubisz?</a>
                      <ul id='dropdown3' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Orzechy').map((product, i) =>
                          <li key={i} value={product.name} onClick={(e) => this.addProduct(e, product)}>
                            <a name='selectedNuts'>{product.name}</a>
                          </li>
                        )}
                      </ul>
                    </div>


                    <div className="input-field col s4">
                      <ul className="collection center">
                        {this.state.selectedMeat.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedMeat", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <ul className="collection center">
                        {this.state.selectedFish.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedFish", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s4">
                      <ul className="collection center">
                        {this.state.selectedNuts.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedNuts", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                  </div>



                  <div className="row">
                    <div className="input-field col s6">
                      <select name="selectedVegetable" onChange={this.addItem}>
                        {this.state.frequencyQuesion.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Warzywa</label>
                    </div>
                    <div className="input-field col s6">
                      <select name="selectedFruit" onChange={this.addItem}>
                        {this.state.frequencyQuesion.map((e, i) => <option key={i} value={e}>{e}</option>)}
                      </select>
                      <label>Owoce</label>
                    </div>
                    <div className="input-field col s6">
                      <a className='dropdown-trigger btn' data-target='dropdown4' style={{ width: '100%' }}>Jakiego nie lubisz?</a>
                      <ul id='dropdown4' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Warzywa').map((product, i) =>
                          <li key={i} value={product.name} onClick={(e) => this.addProduct(e, product)}>
                            <a name='selectedVegetable'>{product.name}</a>
                          </li>
                        )}
                      </ul>
                    </div>


                    <div className="input-field col s6">
                      <a className='dropdown-trigger btn' data-target='dropdown5' style={{ width: '100%' }}>Jakiego nie lubisz?</a>
                      <ul id='dropdown5' className='dropdown-content'>
                        {this.state.products.filter(e => e.category === 'Owoce').map((product, i) =>
                          <li key={i} value={product.name} onClick={(e) => this.addProduct(e, product)}>
                            <a name='selectedFruit'>{product.name}</a>
                          </li>
                        )}
                      </ul>
                    </div>


                    <div className="input-field col s6">
                      <ul className="collection center">
                        {this.state.selectedVegetable.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedVegetable", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
                        )}
                      </ul>
                    </div>
                    <div className="input-field col s6">
                      <ul className="collection center">
                        {this.state.selectedFruit.map((e, i) =>
                          <li key={i} className="collection-item">{e}<a onClick={() => this.onDelete("selectedFruit", e)} className="secondary-content"><i className="material-icons">close</i></a></li>
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

CreateDiet.propTypes = {
  postDiet: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  diet: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  products: state.products,
  diet: state.diet
})

export default connect(mapStateToProps, { postDiet, getProducts })(CreateDiet)
