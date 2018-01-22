import React from 'react';
import { connect } from 'react-redux';
import { getEntities, getCategories, getCategoryBrands } from '../selector';
import Tree from '../components/Tree';
import ActionPanel from './ActionPanel';
import Dialog from './Dialog';
import { categoryAdd, brandAdd, productAdd, nodeDelete } from '../actions';

class TreePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogType: null,
    };
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  closeDialog() {
    this.setState({
      dialogType: null,
    });
  }

  addItem(type) {
    this.setState({
      dialogType: type,
    });
  }

  handleDeleteNode(node) {
    this.props.deleteNode(node.get('id'));
  }

  render() {
    console.log(this.props.brands.toJS());
    return (
      <div className="tree-panel">
        <ActionPanel addItem={this.addItem} />
        <Tree entities={this.props.entities} onDeleteNode={this.handleDeleteNode} />
        <Dialog type={this.state.dialogType} onDialogClose={this.closeDialog} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCategory: name => dispatch(categoryAdd(name)),
  addBrand: (categoryId, name) => dispatch(brandAdd(categoryId, name)),
  addProduct: (brandId, name) => dispatch(productAdd(brandId, name)),
  deleteNode: (type, id) => dispatch(nodeDelete(type, id)),
});
const mapStateToProps = state => ({
  entities: getEntities(state),
  categories: getCategories(state),
  brands: getCategoryBrands(state, 'category-57b42bfe31b6f0132cb96836'),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreePanel);
