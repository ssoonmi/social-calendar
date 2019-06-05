import { combineReducers } from 'redux';
import session from './session/sessionReducer';
import errors from './errors/errorsReducer';

export default combineReducers({
  session,
  errors
})