import React from 'react';
import { connect } from 'react-redux';
import { getTreeRoot, getEntities } from '../selector';
import Tree from '../components/Tree';
import ActionPanel from './ActionPanel';
import Dialog from './Dialog';
import { nodeDelete } from '../actions';

class TreePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogType: null,
    };
    this.handleDeleteNode = this.handleDeleteNode.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
  }

  handleCloseDialog() {
    this.setState({
      dialogType: null,
    });
  }

  handleDialogOpen(type) {
    this.setState({
      dialogType: type,
    });
  }

  handleDeleteNode(node) {
    this.props.deleteNode(node.get('id'));
  }

  render() {
    return (
      <div className="tree-panel">
        <ActionPanel onOpenDialog={this.handleDialogOpen} />
        <Tree
          root={this.props.treeRoot}
          entities={this.props.entities}
          onDeleteNode={this.handleDeleteNode}
        />
        <Dialog type={this.state.dialogType} onDialogClose={this.handleCloseDialog} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  deleteNode: (type, id) => dispatch(nodeDelete(type, id)),
});
const mapStateToProps = state => ({
  entities: getEntities(state),
  treeRoot: getTreeRoot(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(TreePanel);
