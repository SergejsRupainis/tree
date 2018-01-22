import { createSelector } from 'reselect';

const getProductsTree = state => state.get('productsTree');

const getCategoryBrands = (state, categoryId) =>
  state.getIn(['productsTree', 'entities', 'categories', categoryId, 'brands']);

export const getTreeRoot = createSelector([getProductsTree], productsTree =>
  productsTree.getIn(['entities', 'root', 'root']));

export const getEntities = createSelector([getProductsTree], productsTree =>
  productsTree.get('entities'));

export const getCategories = createSelector([getProductsTree], (productsTree) => {
  const rootCategories = productsTree.getIn(['entities', 'root', 'root', 'categories']);
  const categories = productsTree.getIn(['entities', 'categories']);
  return rootCategories.map(categoryId => categories.get(categoryId));
});

export const getCategoryBrandsList = createSelector(
  [getProductsTree, getCategoryBrands],
  (productsTree, categoryBrands) => {
    const brands = productsTree.getIn(['entities', 'brands']);
    return categoryBrands.map(brandId => brands.get(brandId));
  },
);
