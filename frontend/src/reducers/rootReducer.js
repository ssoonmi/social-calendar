import { combineReducers } from 'redux';
import session from './session/sessionReducer';
import errors from './errors/errorsReducer';
import entities from './entities/entitiesReducer';
import ui from './ui/uiReducer';

export default combineReducers({
  session,
  errors,
  entities,
  ui
})