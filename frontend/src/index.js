import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';
import configureStore from './store/store';
import jwtDecode from 'jwt-decode';
import { setAuthToken } from './util/axios';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decodedUser = jwtDecode(localStorage.jwtToken);
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    }

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = '/login';
    } 
  } else {
    store = configureStore();
  }

  window.store = store;

  ReactDOM.render(<Root store={store}/>, document.getElementById('root'));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
