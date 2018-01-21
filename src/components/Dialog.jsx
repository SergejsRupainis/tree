import React from 'react';
import data from '../data/responseData.json';
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
    const { type } = nextProps;
    const newState = {
      category: null,
      brand: null,
      itemName: '',
    };

    if (type === 'brand' || type === 'product') {
      newState.category = data.categories.length ? data.categories[0] : null;
      if (type === 'product') {
        newState.brand =
          newState.category && newState.category.brands.length ? newState.category.brands[0] : null;
      }
    }
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNewNode({ ...this.state, type: this.props.type });
  }

  handleCategoryChange(event) {
    const { value } = event.target;
    const category = data.categories.find(item => item.id === value);
    let brand;
    if (category) {
      brand = category.brands.length ? category.brands[0] : null;
    }

    this.setState({
      category,
      brand,
    });
  }

  handleBrandChange(event) {
    if (this.state.category) {
      const value = Number(event.target.value);
      const brand = this.state.category.brands.find(item => item.id === value);

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

    if (Array.isArray(items)) {
      options = items.map(item => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ));
    } else {
      options = (
        <option disabled selected value>
          {emptyTitle}
        </option>
      );
    }

    return options;
  }

  renderForm() {
    const { type } = this.props;
    const { category, brand } = this.state;
    const title = mapDialogTypesToTitles[type];

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {(type === 'brand' || type === 'product') && (
            <label htmlFor="category">
              <select
                id="category"
                name="categoryId"
                value={category ? category.id : ''}
                onChange={this.handleCategoryChange}
              >
                {data && this.renderOptions(data.categories)}
              </select>
            </label>
          )}
          {type === 'product' && (
            <label htmlFor="brand">
              <select
                id="brand"
                name="brandId"
                value={brand ? brand.id : ''}
                onChange={this.handleBrandChange}
              >
                {category && this.renderOptions(category.brands)}
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
        <input type="submit" value={title} />
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
