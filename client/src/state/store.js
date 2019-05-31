/* eslint-disable no-underscore-dangle */
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { meetup } from './meetup';

// eslint-disable-next-line max-len
const middleware = process.env.NODE_ENV !== 'production' ? [logger, thunk] : thunk;
const rootReducer = combineReducers({
  [meetup.stateKey]: meetup.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
};

const reduxDevTools = process.env.NODE_ENV === 'production'
  ? p => p
  : window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  pReducer,
  {},
  compose(
    applyMiddleware(...middleware),
    reduxDevTools,
  ),
);

export const persister = persistStore(store);
