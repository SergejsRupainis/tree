import React from 'react';

const ActionPanel = ({ addItem }) => (
  <div>
    <span>Actions: </span>
    <button type="button" onClick={() => addItem('category')}>
      Add Category
    </button>
    <button type="button" onClick={() => addItem('brand')}>
      Add Brand
    </button>
    <button type="button" onClick={() => addItem('product')}>
      Add Product
    </button>
  </div>
);

export default ActionPanel;
