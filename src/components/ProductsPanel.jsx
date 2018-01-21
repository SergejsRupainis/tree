import React from 'react';
import ActionPanel from './ActionPanel';
import Tree from './Tree';
import Dialog from './Dialog';
import data from '../data/responseData.json';
import normalizeData from '../data/normalizeData';

class ProductsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogType: null,
      treeRoot: normalizeData(data),
    };

    this.addItem = this.addItem.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addNewNode = this.addNewNode.bind(this);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
  }

  closeDialog() {
    this.setState({
      dialogType: null,
    });
  }

  updateTreeRoot() {
    this.setState(prevState => ({
      treeRoot: prevState.treeRoot,
    }));
  }

  addItem(type) {
    this.setState({
      dialogType: type,
    });
  }

  addCategory(node) {
    this.setState((prevState) => {
      const { treeRoot } = prevState;
      treeRoot.children.push({
        id: `${Math.random()}`,
        name: node.itemName,
        type: node.type,
        children: [],
        parent: treeRoot,
      });
    });
  }

  addBrand(node) {
    this.setState((prevState) => {
      const { treeRoot } = prevState;
      const category = treeRoot.children.find(item => item.id === node.category.id);
      category.children.push({
        id: Math.random(),
        name: node.itemName,
        type: node.type,
        children: [],
        parent: category,
      });
    });
  }

  addProduct(node) {
    this.setState((prevState) => {
      const { treeRoot } = prevState;
      const category = treeRoot.children.find(item => item.id === node.category.id);
      const brand = category.children.find(item => item.id === node.brand.id);
      brand.children.push({
        id: Math.random(),
        name: node.itemName,
        type: node.type,
        parent: brand,
      });
    });
  }

  addNewNode(node) {
    if (node.type === 'category') {
      this.addCategory(node);
    } else if (node.type === 'brand') {
      this.addBrand(node);
    } else if (node.type === 'product') {
      this.addProduct(node);
    }
    this.closeDialog();
  }

  handleDeleteNode(node) {
    const { parent } = node;
    parent.children = parent.children.filter(item => item.id !== node.id);
    this.updateTreeRoot();
  }

  render() {
    return (
      <div className="products-panel">
        <ActionPanel addItem={this.addItem} />
        <Tree root={this.state.treeRoot} onDeleteNode={this.handleDeleteNode} />
        <Dialog
          type={this.state.dialogType}
          data={this.state.treeRoot}
          onDialogClose={this.closeDialog}
          addNewNode={this.addNewNode}
        />
      </div>
    );
  }
}

export default ProductsPanel;
