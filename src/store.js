import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';
import Immutable from 'immutable';
import reducers from './reducers';

const reducer = combineReducers(reducers);
const store = createStore(reducer, Immutable.Map({}));

export default store;
