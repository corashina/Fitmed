import { SET_CURRENT_USER, ADD_USER, GET_USERS } from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  users: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    case ADD_USER:
      return {
        ...state,
        user: action.payload
      }
    case GET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state;
  }
}
