import React from 'react';

const ActionPanel = ({ onOpenDialog }) => (
  <div>
    <span>Actions: </span>
    <button type="button" onClick={() => onOpenDialog('category')}>
      Add Category
    </button>
    <button type="button" onClick={() => onOpenDialog('brand')}>
      Add Brand
    </button>
    <button type="button" onClick={() => onOpenDialog('product')}>
      Add Product
    </button>
  </div>
);

export default ActionPanel;
