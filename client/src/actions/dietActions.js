import { GET_ERRORS, GET_DIET, POST_DIET } from './types';
import axios from 'axios';

export const getDiet = () => dispatch => {
  axios
    .get('/api/diets')
    .then(res => {
      dispatch({
        type: GET_DIET,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getDiets = () => dispatch => {
  axios
    .get('/api/diets', { params: { all: true } })
    .then(res => {
      dispatch({
        type: GET_DIET,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const postDiet = (dietData, history) => dispatch => {
  axios
    .post('/api/diets', dietData)
    .then(res => {
      dispatch({
        type: POST_DIET,
        payload: res.data
      })
      history.push('/dieta')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
