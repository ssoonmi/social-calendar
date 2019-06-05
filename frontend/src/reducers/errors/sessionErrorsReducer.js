import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from '../../actions/session_actions';

const defaultState = {};

export default function sessionErrorsReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case CLEAR_SESSION_ERRORS: 
      return defaultState;
    default:
      return state;
  }
}