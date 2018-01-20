import React from 'react';
import Dialog from './Dialog';

class ProductDialog extends React.PureComponent {
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
      <Dialog title="Add Product" onDialogClose={onDialogClose} handleSubmit={this.handleSubmit} />
    );
  }
}

export default ProductDialog;
