import React, { Component } from 'react'
import NavbarAdmin from '../components/NavbarAdmin';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: 'Gram',
      category: 'Warzywa',
      units: ['Gram', 'Kilogram', 'Szczypta'],
      categories: ['Warzywa', 'Owoce', 'Mieso', 'Nabiał', 'Pieczywo', 'Ryby', 'Napój'],
      products: [],
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      unit: this.state.unit,
      category: this.state.category
    };

    axios.post('/api/products', newProduct)
      .then(res => {
        this.setState({ errors: {}, name: '' })
        this.getProducts();
        window.M.toast({ html: "Produkt dodany" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });

  }
  onDelete(e) {
    axios.delete('/api/products', { params: { jwt: localStorage.getItem('jwt'), name: e } })
      .then(res => {
        this.getProducts();
        window.M.toast({ html: "Produkt usunięty" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });
  }
  getProducts() {
    axios.get('/api/products', { params: { jwt: localStorage.getItem('jwt') } })
      .then(res => this.setState({ products: res.data }))
      .catch(err => this.props.history.push('/404'));
  }
  componentDidMount() { this.getProducts(); }
  render() {
    return (
      <div>
        <NavbarAdmin />
        <div className="row" >
          <form className="col s12" noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s3">
              <input
                id="name"
                className={this.state.errors.name === undefined ? '' : 'invalid'}
                type="text"
                autoComplete="off"
                placeholder="Nazwa"
                name="name"
                value={this.state.name}
                onChange={this.onChange} />
              <span className="helper-text" data-error={this.state.errors.name}></span>
            </div>
            <div className="input-field col s3 center">
              <a
                className="btn modal-trigger" href="#modal2">Jednostka - {this.state.unit}
              </a>
            </div>
            <div className="input-field col s3 center">
              <a
                className="waves-effect waves-light btn modal-trigger" href="#modal1">Kategoria - {this.state.category}
              </a>
            </div>
            <div className="input-field col s3">
              <button
                className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">
                Dodaj
						  </button>
            </div>
            <div id="modal1" className="modal">
              <div className="modal-content">
                <h4 className="center">Kategoria</h4>
                <div className="collection">
                  {this.state.categories.map((cat, i) =>
                    <a key={i} value={cat} className="modal-close collection-item" onClick={() => this.setState({ category: cat })}>{cat}</a>
                  )}
                </div>
              </div>
            </div>
            <div id="modal2" className="modal">
              <div className="modal-content">
                <h4 className="center">Jednostka</h4>
                <div className="collection">
                  {this.state.units.map((unit, i) =>
                    <a key={i} value={unit} className="modal-close collection-item" onClick={() => this.setState({ unit })}>{unit}</a>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="divider"></div>
        <table className="striped highlight centered">
          <thead >
            <tr>
              <th>Nazwa</th>
              <th>Jednostka</th>
              <th>Kategoria</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) =>
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>{product.category}</td>
                <td>
                  <a className="waves-effect waves-light btn-small red" onClick={(e) => this.onDelete(product.name)}><i className="material-icons">close</i></a>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div >
    )
  }
}
