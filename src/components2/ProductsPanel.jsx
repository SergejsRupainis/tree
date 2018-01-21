import React from 'react';
import ActionPanel from './ActionPanel';
import Tree from './Tree';
import Dialog from './Dialog';
import data from '../data/responseData.json';
import normalizeData from '../data/normalizeData';

import getNormalizedData from '../data/getNormalizedData';

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
    // trick: update the state
    // this trick is need because we mutate the data, ideally we should use immutablejs and avoid data mutation
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
    const addFunctionName = {
      category: 'addCategory',
      brand: 'addBrand',
      product: 'addProduct',
    }[node.type];

    this[addFunctionName](node);
    this.closeDialog();
  }

  handleDeleteNode(node) {
    const dd = getNormalizedData();

    console.log(dd);

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
