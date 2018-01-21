const childrenProps = ['categories', 'brands', 'products'];
const childrenPropsToNodeTypes = {
  categories: 'category',
  brands: 'brand',
  products: 'product',
};
const dataProps = ['id', 'name'];

// the data should be improved a bit
const normalizeData = (data, type, parent) => {
  const newData = {
    type,
  };
  const childrenProp = childrenProps.find(prop => data[prop] !== undefined);
  if (childrenProp && Array.isArray(data[childrenProp])) {
    newData.children = data[childrenProp].map(child =>
      normalizeData(child, childrenPropsToNodeTypes[childrenProp], newData));
  }
  dataProps.forEach((prop) => {
    if (prop in data) {
      newData[prop] = data[prop];
    }
  });
  if (type === 'root') {
    newData.id = 0;
    newData.name = '';
  }
  newData.parent = parent;
  return newData;
};

export default (data) => {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    return null;
  }
  return normalizeData(data, 'root', null);
};
