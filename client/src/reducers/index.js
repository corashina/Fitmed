import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import productReducer from './productReducer';
import recipeReducer from './recipeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  data: productReducer,
  recipes: recipeReducer
})