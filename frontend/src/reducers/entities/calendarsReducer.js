import {
  RECEIVE_CALENDARS,
  RECEIVE_CALENDAR,
  REMOVE_CALENDAR
} from '../../actions/calendar_actions';

export default function calendarsReducer(state = {}, action) {
  let newState;
  switch (action.type) {
    case RECEIVE_CALENDARS:
      newState = {};
      action.calendars.forEach(calendar => {
        newState[calendar._id] = calendar;
      });
      return newState;
    case RECEIVE_CALENDAR:
      return Object.assign({}, state, { [action.calendar._id]: action.calendar });
    case REMOVE_CALENDAR:
      newState = Object.assign({}, state);
      delete newState[action.id];
      return newState;
    default:
      return state;
  }
}