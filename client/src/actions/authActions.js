import { GET_ERRORS, SET_CURRENT_USER, GET_USERS } from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';

export const loginUser = (userData) => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      localStorage.setItem('jwt', res.data.token);
      dispatch({
        type: SET_CURRENT_USER,
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

export const registerUser = (newUser, history) => dispatch => {
  axios
    .post('/api/users/register', newUser)
    .then(res => { history.push('/logowanie') })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    });
};

export const getUsers = () => dispatch => {
  axios
    .get('/api/users', { params: { jwt: localStorage.getItem('jwt') } })
    .then(res => {
      dispatch({
        type: GET_USERS,
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

export const logoutUser = (history) => dispatch => {
  localStorage.removeItem('jwt');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};