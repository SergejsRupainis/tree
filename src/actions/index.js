const categoryAdd = name => ({
  data: {
    name,
  },
  type: 'CATEGORY_ADD',
});

const brandAdd = (categoryId, name) => ({
  data: {
    categoryId,
    name,
  },
  type: 'BRAND_ADD',
});

const productAdd = (brandId, name) => ({
  data: {
    brandId,
    name,
  },
  type: 'PRODUCT_ADD',
});

const nodeDelete = id => ({
  data: {
    id,
  },
  type: 'NODE_DELETE',
});

export { categoryAdd, brandAdd, productAdd, nodeDelete };
