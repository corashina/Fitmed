import { GET_SUPPLEMENTATION, POST_SUPPLEMENTATION } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLEMENTATION:
      return action.payload
    case POST_SUPPLEMENTATION:
      return action.payload
    default:
      return state;
  }
}
