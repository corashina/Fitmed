import React, { Component } from 'react'
import { getProducts, addProduct, deleteProduct } from '../../actions/productActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: 'Gram',
      category: 'Warzywa',
      units: ['Gram', 'Kilogram', 'Szczypta'],
      categories: ['Warzywa', 'Orzechy', 'Owoce', 'Mieso', 'Nabiał', 'Pieczywo', 'Ryby', 'Napój'],
      products: [],
      sortByName: false,
      sortByUnit: false,
      sortByCategory: false,
      errors: {}
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  onChange(e) { this.setState({ [e.target.name]: e.target.value }); }
  onSubmit(e) {
    e.preventDefault();

    const newProduct = {
      name: this.state.name,
      unit: this.state.unit,
      category: this.state.category
    };

    this.props.addProduct(newProduct);
    this.setState({ name: '' });
  }
  componentWillReceiveProps(nextProps) {
    if (Array.isArray(nextProps.products)) this.setState({ products: nextProps.products });
    if (nextProps.errors) this.setState({ errors: nextProps.errors });
  }
  componentDidMount() { this.props.getProducts(); }
  handleChange(e) {
    this.setState({ sortByName: false })
    this.setState({ sortByUnit: false })
    this.setState({ sortByCategory: false })
    this.setState({ [e.target.value]: true })
  }
  render() {
    let filteredProducts = this.state.sortByName === true ? this.state.products.sort((a, b) => a.name.localeCompare(b.name)) : this.state.recipes;

    filteredProducts = this.state.sortByUnit === true ? this.state.products.sort((a, b) => a.unit.localeCompare(b.unit)) : this.state.recipes;

    filteredProducts = this.state.sortByCategory === true ? this.state.products.sort((a, b) => a.category.localeCompare(b.category)) : this.state.recipes;

    return (
      <div>
        <div className="row" >
          <div className="col s3 card-panel">
            <form className="col s12" noValidate onSubmit={this.onSubmit}>
              <div className="row">
                <div className="input-field col s12">
                  <input
                    id="name"
                    className={this.state.errors.name === undefined ? '' : 'invalid'}
                    type="text"
                    autoComplete="off"
                    placeholder="Nazwa produktu"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange} />
                  <span className="helper-text" data-error={this.state.errors.name}></span>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12" >
                  <a style={{ width: '100%' }}
                    className="btn modal-trigger" href="#modal2">Jednostka - {this.state.unit}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <a style={{ width: '100%' }}
                    className="waves-effect waves-light btn modal-trigger" href="#modal1">Kategoria - {this.state.category}
                  </a>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">
                    Dodaj
						  </button>
                </div>
              </div>
              <div className="row">
                <label className="col s12">
                  <input name="group1" type="radio" value="sortByName" checked={this.state.sortByName} onChange={this.handleChange} />
                  <span>Sortuj po nazwie</span>
                </label>
              </div>
              <div className="row">
                <label className="col s12">
                  <input name="group1" type="radio" value="sortByUnit" checked={this.state.sortByUnit} onChange={this.handleChange} />
                  <span>Sortuj po jednostce</span>
                </label>
              </div>
              <div className="row">
                <label className="col s12">
                  <input name="group1" type="radio" value="sortByCategory" checked={this.state.sortByCategory} onChange={this.handleChange} />
                  <span>Sortuj po kategorii</span>
                </label>
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

          <div className="col s9">
            <table className="striped highlight">
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
                      <a className="btn-floating waves-effect waves-light btn-small red" onClick={(e) => this.props.deleteProduct(product.name)}><i className="material-icons">close</i></a>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div >
      </div>
    )
  }
}

Products.propTypes = {
  getProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  products: state.products
});

export default connect(mapStateToProps, { getProducts, addProduct, deleteProduct })(Products)
