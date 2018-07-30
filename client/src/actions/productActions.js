import { GET_ERRORS, GET_PRODUCTS, POST_PRODUCT, DELETE_PRODUCT } from './types';
import axios from 'axios';

export const getProducts = () => dispatch => {
  axios
    .get('/api/products', { params: { jwt: localStorage.getItem('jwt') } })
    .then(res =>
      dispatch({
        type: GET_PRODUCTS,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addProduct = (newProduct) => dispatch => {
  axios
    .post('/api/products', newProduct)
    .then(res => {
      dispatch({
        type: POST_PRODUCT,
        payload: res.data
      })
      window.M.toast({ html: "Produkt dodany" });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
};

export const deleteProduct = (productData) => dispatch => {
  axios
    .delete('/api/products', { params: { name: productData } })
    .then(res => {
      dispatch({
        type: DELETE_PRODUCT,
        payload: res.data
      })
      window.M.toast({ html: "Produkt usunięty" });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};