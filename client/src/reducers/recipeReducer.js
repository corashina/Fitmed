import { GET_RECIPES, POST_RECIPE, DELETE_RECIPE } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: action.payload
      }
    case POST_RECIPE:
      return {
        ...state,
        recipes: [action.payload, ...state.products]
      }
    case DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter(recipe => recipe._id !== action.payload._id)
      };
    default:
      return state;
  }
}
