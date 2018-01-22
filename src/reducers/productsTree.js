import { createReducer } from 'redux-create-reducer';
import Immutable from 'immutable';
import getNormalizedData from '../data/getNormalizedData';

const initialState = Immutable.fromJS(getNormalizedData());

const PATHS = {
  rootCategories: ['entities', 'root', 'root', 'categories'],
  categories: ['entities', 'categories'],
  brands: ['entities', 'brands'],
  products: ['entities', 'products'],
};

const CATEGORY_ADD = (domain, action) => {
  const { name } = action.data;
  const newId = `category-${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      [...PATHS.categories, newId],
      Immutable.fromJS({
        id: newId,
        name,
        brands: [],
      }),
    );
    const length = productsTree.getIn(PATHS.rootCategories).size;
    productsTree.setIn([...PATHS.rootCategories, length], newId);
  });
};

const BRAND_ADD = (domain, action) => {
  const { categoryId, name } = action.data;
  const newId = `brand-${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      [...PATHS.brands, newId],
      Immutable.fromJS({
        id: newId,
        name,
        products: [],
      }),
    );
    const brandsPath = [...PATHS.categories, categoryId, 'brands'];
    const length = productsTree.getIn(brandsPath).size;
    productsTree.setIn([...brandsPath, length], newId);
  });
};

const PRODUCT_ADD = (domain, action) => {
  const { brandId, name } = action.data;
  const newId = `product-${Math.random()}`;

  return domain.withMutations((productsTree) => {
    productsTree.setIn(
      [...PATHS.products, newId],
      Immutable.fromJS({
        id: newId,
        name,
      }),
    );
    const productsPath = [...PATHS.brands, brandId, 'products'];
    const length = productsTree.getIn(productsPath).size;
    productsTree.setIn([...productsPath, length], newId);
  });
};

const NODE_DELETE = (domain, action) => {
  const { id } = action.data;

  // first part of id is a type of the node
  const [type] = id.split('-');
  let nodePath;
  let parentPath;
  let childrenName;

  switch (type) {
    case 'product':
      nodePath = PATHS.products;
      parentPath = PATHS.brands;
      childrenName = 'products';
      break;
    case 'brand':
      parentPath = PATHS.categories;
      nodePath = PATHS.brands;
      childrenName = 'brands';
      break;
    case 'category':
      nodePath = PATHS.categories;
      parentPath = PATHS.rootCategories;
      break;
    default:
  }

  let newDomain = domain.deleteIn([...nodePath, id]);

  let nodeIndex;
  let parentId;

  if (type === 'category') {
    nodeIndex = newDomain.getIn(parentPath).findIndex(x => x === id);
    if (nodeIndex >= 0) {
      newDomain = newDomain.deleteIn([...parentPath, nodeIndex]);
    }
  } else {
    parentId = domain.getIn(parentPath).findKey((x) => {
      const index = x.get(childrenName).findIndex(k => k === id);
      if (index >= 0) {
        nodeIndex = index;
        return true;
      }
      return false;
    });
    if (parentId && nodeIndex >= 0) {
      newDomain = newDomain.deleteIn([...parentPath, parentId, childrenName, nodeIndex]);
    }
  }
  return newDomain;
};

export default createReducer(initialState, {
  CATEGORY_ADD,
  BRAND_ADD,
  PRODUCT_ADD,
  NODE_DELETE,
});
