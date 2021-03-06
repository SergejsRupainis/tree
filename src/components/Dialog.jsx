import React from 'react';
// import data from '../data/responseData.json';
import Overlay from './Overlay';
import './Dialog.css';

const mapDialogTypesToTitles = {
  product: 'Add Product',
  brand: 'Add Brand',
  category: 'Add Category',
};

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    // initial state
    this.state = {
      category: null,
      brand: null,
      itemName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { type, data } = nextProps;
    const newState = {
      category: null,
      brand: null,
      itemName: '',
    };

    // collect all categories and brands to show them in drodowns
    if (type === 'brand' || type === 'product') {
      newState.category = data.children.length ? data.children[0] : null;
      if (type === 'product') {
        newState.brand =
          newState.category && newState.category.children.length
            ? newState.category.children[0]
            : null;
      }
    }
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    // very primitive validation
    const { itemName, category, brand } = this.state;
    const { type } = this.props;
    if (!itemName) {
      alert('Field "Name" is empty. It should not be!');
      return;
    }
    if ((type === 'brand' || type === 'product') && !category) {
      alert('You should choose category');
      return;
    }
    if (type === 'product' && !brand) {
      alert('You should choose brand');
      return;
    }

    this.props.addNewNode({ ...this.state, type: this.props.type });
  }

  handleCategoryChange(event) {
    const { value } = event.target;
    const category = this.props.data.children.find(item => item.id === value);
    let brand;

    if (category) {
      brand = category.children.length ? category.children[0] : null;
    }

    this.setState({
      category,
      brand,
    });
  }

  handleBrandChange(event) {
    if (this.state.category) {
      const value = Number(event.target.value);
      const brand = this.state.category.children.find(item => item.id === value);

      this.setState({
        brand,
      });
    }
  }

  handleChange(event) {
    const { target } = event;
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  renderOptions(items, emptyTitle) {
    let options;

    if (Array.isArray(items) && items.length) {
      options = items.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
    } else {
      options = (
        <option disabled value="" defaultValue="">
          {emptyTitle}
        </option>
      );
    }

    return options;
  }

  renderForm() {
    const { type, data } = this.props;
    const { category, brand } = this.state;
    const title = mapDialogTypesToTitles[type];

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {(type === 'brand' || type === 'product') && (
            <label htmlFor="category">
              <span>Category</span>
              <select
                id="category"
                name="categoryId"
                value={category ? category.id : ''}
                onChange={this.handleCategoryChange}
              >
                {data && this.renderOptions(data.children, '-- There are no categories here! --')}
              </select>
            </label>
          )}
          {type === 'product' && (
            <label htmlFor="brand">
              <span>Brand</span>
              <select
                id="brand"
                name="brandId"
                value={brand ? brand.id : ''}
                onChange={this.handleBrandChange}
              >
                {category &&
                  this.renderOptions(category.children, '-- There are no brands here! --')}
              </select>
            </label>
          )}
          <label htmlFor="itemName">
            <span>Name</span>
            <input
              id="itemName"
              name="itemName"
              type="text"
              value={this.state.itemName}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <hr />
        <footer>
          <input type="submit" value={title} />
        </footer>
      </form>
    );
  }

  render() {
    const { type } = this.props;
    if (!type) {
      return null;
    }

    const { onDialogClose } = this.props;
    const title = mapDialogTypesToTitles[type];

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
          <div className="body">{this.renderForm()}</div>
        </div>
      </Overlay>
    );
  }
}

export default Dialog;
