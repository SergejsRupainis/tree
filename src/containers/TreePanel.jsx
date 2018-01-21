import React from 'react';
import { connect } from 'react-redux';
import getEntities from '../selector';
import Tree from '../components/Tree';
import { categoryAdd, brandAdd, productAdd, nodeDelete } from '../actions';

class TreePanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
  }

  handleDeleteNode(node) {
    this.props.addProduct();
  }

  render() {
    console.log(this.props.entities.toJS());
    return (
      <div className="tree-panel">
        <Tree entities={this.props.entities} onDeleteNode={this.handleDeleteNode} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCategory: () => dispatch(categoryAdd()),
  addBrand: () => dispatch(brandAdd()),
  addProduct: () => dispatch(productAdd()),
  deleteNode: () => dispatch(nodeDelete()),
});
const mapStateToProps = state => ({
  entities: getEntities(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreePanel);
