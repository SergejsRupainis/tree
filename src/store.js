import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import reducers from './reducers';

const reducer = combineReducers(reducers);
/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducer,
  Immutable.Map({}),
  // we can use Redux DEV tools
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

export default store;
