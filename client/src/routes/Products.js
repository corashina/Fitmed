import React, { Component } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      unit: '',
      category: '',
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
        this.setState({ errors: {}, name: '', unit: '', category: '' })
        this.getProducts();
        window.M.toast({ html: "Product created" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });

  }
  onDelete(e) {
    axios.delete('/api/products', { params: { jwt: localStorage.getItem('jwt'), name: e } })
      .then(res => {
        this.getProducts();
        window.M.toast({ html: "Product deleted" });
      })
      .catch(err => { this.setState({ errors: err.response.data }) });
  }
  getProducts() {
    axios.get('/api/products', { params: { jwt: localStorage.getItem('jwt') } })
      .then(res => this.setState({ products: res.data }))
      .catch(err => this.props.history.push('/home'));
  }
  componentDidMount() { this.getProducts(); }
  render() {
    return (
      <div>
        <Navbar />
        <div className="row" >
          <form className="col s12" noValidate onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s3">
                <input id="name" className={this.state.errors.name === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange} />
                <span className="helper-text" data-error={this.state.errors.name}></span>
              </div>
              <div className="input-field col s3">
                <input id="unit" className={this.state.errors.unit === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                  placeholder="Unit"
                  name="unit"
                  value={this.state.unit}
                  onChange={this.onChange} />
                <span className="helper-text" data-error={this.state.errors.unit}></span>
              </div>
              <div className="input-field col s3">
                <input id="category" className={this.state.errors.category === undefined ? '' : 'invalid'} type="text" autoComplete="off"
                  placeholder="Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange} />
                <span className="helper-text" data-error={this.state.errors.category}></span>
              </div>
              <div className="input-field col s3">
                <button className="btn waves-effect waves-light" style={{ width: '100%' }} type="submit" name="action">
                  Add product
							</button>
              </div>
            </div>
          </form>
        </div>

        <table className="striped highlight">
          <thead >
            <tr>
              <th>Name</th>
              <th>Unit</th>
              <th>Category</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products.map((product) =>
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{product.unit}</td>
                <td>{product.category}</td>
                <td>
                  <a className="waves-effect waves-light btn-small red" onClick={(e) => this.onDelete(product.name)}>Delete</a>
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}
