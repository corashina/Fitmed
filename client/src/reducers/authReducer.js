import { GET_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        isAuthenticated: true,
        user: action.payload
      }
    default:
      return state;
  }
}
