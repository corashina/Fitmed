import { GET_ERRORS, GET_USER } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      dispatch({
        type: GET_USER,
        payload: jwt_decode(res.data.token).user
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

