import { createSelector } from 'reselect';

export default state => state.getIn(['productsTree', 'entities']);
