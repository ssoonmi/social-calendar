import * as APIUtil from '../util/calendar_api_util';

export const RECEIVE_CALENDARS = "RECEIVE_CALENDARS";
export const RECEIVE_CALENDAR = "RECEIVE_CALENDAR";
export const REMOVE_CALENDAR = "REMOVE_CALENDAR";
export const RECEIVE_CALENDAR_ERRORS = "RECEIVE_CALENDAR_ERRORS";
export const CLEAR_CALENDAR_ERRORS = "CLEAR_CALENDAR_ERRORS";

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_CALENDAR_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_CALENDAR_ERRORS
  };
};

export const fetchCalendars = () => dispatch => {
  return APIUtil.fetchCalendars()
    .then(calendars => {
      dispatch({
        type: RECEIVE_CALENDARS,
        calendars
      });
    });
};

export const fetchCalendar = (id) => dispatch => {
  return APIUtil.fetchCalendar(id)
    .then(calendar => {
      dispatch({
        type: RECEIVE_CALENDAR,
        calendar
      });
    });
};

export const createCalendar = (calendar) => dispatch => {
  return APIUtil.createCalendar(calendar)
    .then(calendar => {
      return dispatch({
        type: RECEIVE_CALENDAR,
        calendar
      });
    }, err => (
      dispatch(receiveErrors(err.response.data))
    ));
};

export const updateCalendar = (calendar, id) => dispatch => {
  return APIUtil.updateCalendar(calendar, id)
    .then(calendar => {
      return dispatch({
        type: RECEIVE_CALENDAR,
        calendar
      });
    }, err => (
      dispatch(receiveErrors(err.response.data))
    ));
};

export const deleteCalendar = (id) => dispatch => {
  return APIUtil.deleteCalendar(id)
    .then(() => {
      dispatch({
        type: REMOVE_CALENDAR,
        id
      });
    });
};
