import { setAuthToken } from '../util/axios';
import jwtDecode from 'jwt-decode';
import * as APIUtil from '../util/session_api_util';

export const LOGOUT = "LOGOUT";
export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";

const receiveErrors = (errors) => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS
  };
};

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  return dispatch({
    type: LOGOUT
  });
};

export const signup = user => dispatch => (
  APIUtil.signup(user).then(res => {
    const { token } = res;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch({
      type: RECEIVE_CURRENT_USER,
      user: decoded
    })
  }, err => {
    return dispatch(receiveErrors(err.response.data));
  })
);

// Upon login, set the session token and dispatch the current user. Dispatch errors on failure.
export const login = user => dispatch => (
  APIUtil.login(user).then(res => {
    const { token } = res;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    dispatch({
      type: RECEIVE_CURRENT_USER,
      user: decoded
    })
  }, err => {
    return dispatch(receiveErrors(err.response.data));
  })
);