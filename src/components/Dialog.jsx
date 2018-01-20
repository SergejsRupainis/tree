import React from 'react';
import Overlay from './Overlay';
import './Dialog.css';

class Dialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit();
  }

  render() {
    const { title, onDialogClose, children } = this.props;

    return (
      <Overlay>
        <div className="dialog">
          <div className="dialog-title">
            <span>{title}</span>
            <span>
              <button type="button" onClick={onDialogClose}>
                X
              </button>
            </span>
          </div>
          <div className="body">
            <form onSubmit={this.handleSubmit}>
              <div>{children}</div>
              <hr />
              <input type="submit" value={title} />
            </form>
          </div>
        </div>
      </Overlay>
    );
  }
}

/*
const Dialog = ({ children, title, onDialogClose }) => (
  <Overlay>
    <div className="dialog">
      <div className="dialog-title">
        <span>{title}</span>
        <span>
          <button type="button" onClick={onDialogClose}>
            X
          </button>
        </span>
      </div>
      <div className="body">
        <form onSubmit={this.handleSubmit}>
          <div>{children}</div>
          <hr />
          <input type="submit" value={title} />
        </form>
      </div>
    </div>
  </Overlay>
);
*/
export default Dialog;
