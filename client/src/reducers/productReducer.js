import { GET_PRODUCTS, POST_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.payload
    case POST_PRODUCT:
      return [action.payload, ...state]
    case DELETE_PRODUCT:
      return state.filter(product => product._id !== action.payload._id)
    default:
      return state;
  }
}
