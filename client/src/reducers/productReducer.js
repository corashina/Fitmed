import { GET_PRODUCTS, POST_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case POST_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products]
      }
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product._id !== action.payload._id)
      };
    default:
      return state;
  }
}
