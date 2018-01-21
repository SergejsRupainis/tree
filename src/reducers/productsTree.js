import { createReducer } from 'redux-create-reducer';
import Immutable from 'immutable';
import getNormalizedData from '../data/getNormalizedData';

const initialState = Immutable.fromJS(getNormalizedData());

const CATEGORY_ADD = (domain, action) => {
  const newId = `${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      ['entities', 'categories', newId],
      Immutable.fromJS({ id: newId, name: 'test', brands: [] }),
    );
    const length = productsTree.getIn(['entities', 'root', 'root', 'categories']).size;
    productsTree.setIn(['entities', 'root', 'root', 'categories', length], newId);
  });
};

const BRAND_ADD = (domain, action) => {
  const newId = `${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      ['entities', 'brands', newId],
      Immutable.fromJS({ id: newId, name: 'test', products: [] }),
    );
    const length = productsTree.getIn([
      'entities',
      'categories',
      '57b42bfe7e7298611b333652',
      'brands',
    ]).size;
    productsTree.setIn(
      ['entities', 'categories', '57b42bfe7e7298611b333652', 'brands', length],
      newId,
    );
  });
};

const PRODUCT_ADD = (domain, action) => {
  const newId = `${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      ['entities', 'products', newId],
      Immutable.fromJS({ id: newId, name: 'test' }),
    );
    const length = productsTree.getIn([
      'entities',
      'brands',
      '57b42bfe31b6f0132cb96836-1',
      'products',
    ]).size;
    productsTree.setIn(
      ['entities', 'brands', '57b42bfe31b6f0132cb96836-1', 'products', length],
      newId,
    );
  });
};

const NODE_DELETE = (domain, action) => {
  const dd = domain.withMutations((productsTree) => {
    // productsTree.deleteIn[]
  });
  console.log(dd.toJS());
  return dd;
};

export default createReducer(initialState, {
  CATEGORY_ADD,
  BRAND_ADD,
  PRODUCT_ADD,
  NODE_DELETE,
});
