import { GET_ERRORS, GET_RECIPES, POST_RECIPE, DELETE_RECIPE } from './types';
import axios from 'axios';

export const getRecipes = (history) => dispatch => {
  axios
    .get('/api/recipes')
    .then(res => {
      dispatch({
        type: GET_RECIPES,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const addRecipe = (newProduct) => dispatch => {
  axios
    .post('/api/recipes', newProduct)
    .then(res => {
      dispatch({
        type: POST_RECIPE,
        payload: res.data
      })
      window.M.toast({ html: "Przepis dodany" });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const deleteRecipe = (productData) => dispatch => {
  axios
    .delete('/api/recipes', { params: { name: productData } })
    .then(res => {
      window.M.toast({ html: "Przepis usunięty" });
      dispatch({
        type: DELETE_RECIPE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};