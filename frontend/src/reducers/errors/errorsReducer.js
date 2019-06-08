import { combineReducers } from 'redux';
import session from './sessionErrorsReducer';
import calendar from './calendarErrorsReducer';

export default combineReducers({
  session,
  calendar
});