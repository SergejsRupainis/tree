import React from 'react';
import Dialog from './Dialog';

class CategoryDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.props.addNewNode({ type: 'category' });
  }

  render() {
    const { onDialogClose } = this.props;

    return (
      <Dialog title="Add Category" onDialogClose={onDialogClose} handleSubmit={this.handleSubmit} />
    );
  }
}

export default CategoryDialog;
