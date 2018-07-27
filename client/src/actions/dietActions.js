import { GET_ERRORS, GET_DIET } from './types';
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
