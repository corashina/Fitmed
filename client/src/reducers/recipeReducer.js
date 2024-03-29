import { GET_RECIPES, POST_RECIPE, DELETE_RECIPE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload
    case POST_RECIPE:
      return [action.payload, ...state]
    case DELETE_RECIPE:
      return state.filter(recipe => recipe._id !== action.payload._id)
    default:
      return state;
  }
}
