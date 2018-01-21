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

  const product = new schema.Entity('product');
  const brand = new schema.Entity('brand', {
    products: [product],
  });
  const category = new schema.Entity('categories', {
    brands: [brand],
  });
  const root = new schema.Entity('root', {
    categories: [category],
  });

  const normalizedData = normalize(data, root);

  return normalizedData;
};
