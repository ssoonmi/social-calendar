import {
  RECEIVE_USERS,
  RECEIVE_USER
} from '../../actions/user_actions';
import { RECEIVE_CURRENT_USER } from '../../actions/session_actions';

export default function usersReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_USERS:
      newState = {};
      action.users.forEach(user => {
        newState[user.id] = user;
      });
      return newState;
    case RECEIVE_CURRENT_USER:
    case RECEIVE_USER:
      return Object.assign({}, state, { [action.user.id]: action.user });
    default:
      return state;
  }
}