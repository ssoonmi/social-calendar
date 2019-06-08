import { 
  RECEIVE_CALENDAR_ERRORS,
  CLEAR_CALENDAR_ERRORS
} from '../../actions/calendar_actions';

const defaultState = {};

export default function calendarErrorsReducer(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_CALENDAR_ERRORS:
      return action.errors;
    case CLEAR_CALENDAR_ERRORS:
      return defaultState;
    default:
      return state;
  }
}