/* eslint-disable no-underscore-dangle */
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { meetup } from './meetup';
import { url } from './url';
import { auth } from './auth';
import { alert } from './alert';

// eslint-disable-next-line max-len
const middleware = process.env.NODE_ENV !== 'production' ? [logger, thunk] : [thunk];
const rootReducer = combineReducers({
  [meetup.stateKey]: meetup.reducer,
  [url.stateKey]: url.reducer,
  [auth.stateKey]: auth.authReducer,
  [alert.stateKey]: alert.alertReducer,
});

const reduxDevTools = process.env.NODE_ENV === 'production'
  ? p => p
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    reduxDevTools,
  ),
);

export default store;
