import { normalize, schema } from 'normalizr';
import data from './responseData.json';

const prepareData = () => {
  data.id = 'root';
  data.categories.forEach((category) => {
    category.brands.forEach((brand) => {
      brand.originId = brand.id;
      brand.id = `${category.id}-${brand.originId}`;
      brand.products.forEach((product) => {
        product.originId = product.id;
        product.id = `${brand.id}-${product.originId}`;
      });
    });
  });
};

export default () => {
  prepareData();

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

  const normalizedData = normalize(data, root);

  return normalizedData;
};
