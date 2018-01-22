import { normalize, schema } from 'normalizr';
import data from './responseData.json';

const prepareData = () => {
  data.id = 'root';
  data.childrenProperty = 'categories';
  data.categories.forEach((category) => {
    category.originId = category.id;
    category.id = `category-${category.originId}`;
    category.childrenProperty = 'brands';
    category.brands.forEach((brand) => {
      brand.originId = brand.id;
      brand.id = `brand-${category.originId}-${brand.originId}`;
      brand.childrenProperty = 'products';
      brand.products.forEach((product) => {
        product.originId = product.id;
        product.id = `product-${category.originId}-${brand.originId}-${product.originId}`;
        product.childrenProperty = null;
      });
    });
  });
};

export default () => {
  // generate unique ids for each node
  prepareData();

  // create normalized data, avoid deeply nested structures
  const products = new schema.Entity('products');
  const brands = new schema.Entity('brands', {
    products: [products],
  });
  const category = new schema.Entity('categories', {
    brands: [brands],
  });
  const root = new schema.Entity('root', {
    categories: [category],
  });
  return normalize(data, root);
};
