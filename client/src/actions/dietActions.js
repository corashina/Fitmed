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

export const getDietById = (id) => dispatch => {
  axios
    .get(`/api/diets/${id}`)
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

export const addRecipeToDiet = (recipeData, id, field) => dispatch => {
  axios
    .post(`/api/diets/${id}/addRecipe`, { data: recipeData, field })
    .then(res => {
      window.M.toast({ html: "Przepis dodany" });
      dispatch({
        type: POST_DIET,
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

export const deleteRecipeFromDiet = (name, id, field) => dispatch => {
  axios
    .post(`/api/diets/${id}/deleteRecipe`, { field, name })
    .then(res => {
      window.M.toast({ html: "Przepis usunięty" });
      dispatch({
        type: POST_DIET,
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

export const updateDietTime = (time, id) => dispatch => {
  axios
    .put(`/api/diets/${id}/updateTime`, { time: time })
    .then(res => {
      window.M.toast({ html: "Godzina zmieniona" });
      dispatch({
        type: POST_DIET,
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

export const addComment = (comment, id) => dispatch => {
  axios
    .post(`/api/diets/${id}/addComment`, { comment })
    .then(res => {
      window.M.toast({ html: "Komentarz dodany" });
      dispatch({
        type: POST_DIET,
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

export const deleteComment = (comment, id) => dispatch => {
  axios
    .put(`/api/diets/${id}/deleteComment`, { comment })
    .then(res => {
      window.M.toast({ html: "Komentarz usunięty" });
      dispatch({
        type: POST_DIET,
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