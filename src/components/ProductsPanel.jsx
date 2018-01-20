import React from 'react';
import ActionPanel from './ActionPanel';
import Tree from './Tree';
import CategoryDialog from './CategoryDialog';
import BrandDialog from './BrandDialog';
import ProductDialog from './ProductDialog';
import data from '../data/responseData.json';
import normalizeData from '../data/normalizeData';

const normalizedData = normalizeData(data);

const dialogTypes = {
  category: CategoryDialog,
  brand: BrandDialog,
  product: ProductDialog,
};

class ProductsPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      dialogType: null,
    };

    this.addItem = this.addItem.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.addNewNode = this.addNewNode.bind(this);
  }

  onDialogClose() {
    this.setState({
      dialogType: null,
    });
  }

  addItem(type) {
    this.setState({
      dialogType: type,
    });
  }

  addNewNode(node) {
    console.log(node);
  }

  render() {
    const AddNodeDialog = dialogTypes[this.state.dialogType];

    return (
      <div className="products-panel">
        <ActionPanel addItem={this.addItem} />
        <Tree root={normalizedData} />
        {this.state.dialogType && (
          <AddNodeDialog onDialogClose={this.onDialogClose} addNewNode={this.addNewNode} />
        )}
      </div>
    );
  }
}

export default ProductsPanel;
