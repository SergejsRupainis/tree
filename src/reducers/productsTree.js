import { createReducer } from 'redux-create-reducer';
import Immutable from 'immutable';

const initialState = Immutable.fromJS([]);

const CATEGORY_ADD = (domain, action) => domain;

const BRAND_ADD = (domain, action) => domain;

const PRODUCT_ADD = (domain, action) => domain;

const NODE_DELETE = (domain, action) => {};

export default createReducer(initialState, {
  CATEGORY_ADD,
  BRAND_ADD,
  PRODUCT_ADD,
  NODE_DELETE,
});
