import { LOGOUT, RECEIVE_CURRENT_USER } from '../../actions/session_actions';

const defaultState = {
  isAuthenticated: false,
  user: undefined
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGOUT:
      return {
        isAuthenticated: false,
        user: undefined
      };
    case RECEIVE_CURRENT_USER: 
      return {
        isAuthenticated: !!action.user,
        user: action.user
      };
    default:
      return state;
  }
}