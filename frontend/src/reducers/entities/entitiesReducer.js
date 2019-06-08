import { combineReducers } from 'redux';
import users from './usersReducer';
import calendars from './calendarsReducer';

export default combineReducers({
  users,
  calendars
});