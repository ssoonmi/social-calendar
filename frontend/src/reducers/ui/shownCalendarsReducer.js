import { TOGGLE_SHOWN_CALENDAR } from '../../actions/shown_calendar_actions';

export default function shownCalendarsReducer(state = {}, action) {
  switch (action.type) {
    case TOGGLE_SHOWN_CALENDAR:
      const newState = Object.assign({}, state);
      if (newState[action.id]) {
        delete newState[action.id];
      } else {
        newState[action.id] = true;
      }
      localStorage.setItem('shownCalendars', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}