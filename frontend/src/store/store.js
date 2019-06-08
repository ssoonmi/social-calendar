import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(preloadedState = {}) {
  try {
    if (localStorage.shownCalendars) {
      preloadedState.ui = { shownCalendars: JSON.parse(localStorage.shownCalendars) };
    }
  } catch {
    preloadedState.ui = { shownCalendars: {} };
  }

  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
}