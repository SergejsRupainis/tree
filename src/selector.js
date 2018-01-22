import { createSelector } from 'reselect';

export const getEntities = state => state.getIn(['productsTree', 'entities']);

export const getCategories = (state) => {
  const rootCategories = state.getIn(['productsTree', 'entities', 'root', 'root', 'categories']);
  const categories = state.getIn(['productsTree', 'entities', 'categories']);
  return rootCategories.map(categoryId => categories.get(categoryId));
};

const getCategory = (state, categoryId) =>
  state.getIn(['productsTree', 'entities', 'categories', categoryId]);

export const getCategoryBrands = (state, categoryId) => {
  const categoryBrands = getCategory(state, categoryId).get('brands');
  const brands = state.getIn(['productsTree', 'entities', 'brands']);
  return categoryBrands.map(brandId => brands.get(brandId));
};
