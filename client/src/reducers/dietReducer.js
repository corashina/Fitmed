import { GET_DIET, POST_DIET } from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DIET:
      return action.payload
    case POST_DIET:
      return action.payload
    default:
      return state;
  }
}
