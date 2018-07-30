import { GET_ERRORS, GET_SUPPLEMENTATION, POST_SUPPLEMENTATION } from './types';
import axios from 'axios';

export const getSupplementation = () => dispatch => {
  axios
    .get('/api/supplementations')
    .then(res => {
      dispatch({
        type: GET_SUPPLEMENTATION,
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

export const postSupplementation = (supplementationData, history) => dispatch => {
  axios
    .post('/api/supplementations', supplementationData)
    .then(res => {
      dispatch({
        type: POST_SUPPLEMENTATION,
        payload: res.data
      })
      history.push('/suplementacja')
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
