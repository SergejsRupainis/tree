import React from 'react';
import { connect } from 'react-redux';
import Overlay from '../components/Overlay';
import './Dialog.css';
import { getEntities, getCategories, getCategoryBrands } from '../selector';
import { categoryAdd, brandAdd, productAdd, nodeDelete } from '../actions';

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
      brands: [],
      itemName: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleBrandChange = this.handleBrandChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(() => {
      const newState = {
        category: null,
        brand: null,
        brands: [],
        itemName: '',
      };
      newState.category = nextProps.categories.get(0);
      newState.brands = nextProps.getCategoryBrands(newState.category.get('id'));
      newState.brand = newState.brands && newState.brands.size ? newState.brands.get(0) : null;

      return newState;
    });
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
    }

    switch (type) {
      case 'category':
        this.props.addCategory(this.state.itemName);
        break;
      case 'brand':
        this.props.addBrand(category.get('id'), this.state.itemName);
        break;
      case 'product':
        this.props.addProduct(brand.get('id'), this.state.itemName);
        break;
      default:
    }

    this.props.onDialogClose();
  }

  handleCategoryChange(event) {
    const { value } = event.target;
    const brands = this.props.getCategoryBrands(value);
    this.setState({
      category: this.props.categories.find(category => category.get('id') === value),
      brand: brands && brands.size ? brands.get(0) : null,
      brands,
    });
  }

  handleBrandChange(event) {
    const { value } = event.target;
    this.setState(prevState => ({
      brand: prevState.brands.find(brand => brand.get('id') === value),
    }));
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

    if (items.size) {
      options = items.map(item => (
        <option key={item.get('id')} value={item.get('id')}>
          {item.get('name')}
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
    const { type, categories } = this.props;
    const {
      category, brand, brands, itemName,
    } = this.state;
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
                {this.renderOptions(categories, '-- There are no categories here! --')}
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
                {this.renderOptions(brands, '-- There are no brands here! --')}
              </select>
            </label>
          )}
          <label htmlFor="itemName">
            <span>Name</span>
            <input
              id="itemName"
              name="itemName"
              type="text"
              value={itemName}
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

const mapDispatchToProps = dispatch => ({
  addCategory: name => dispatch(categoryAdd(name)),
  addBrand: (categoryId, name) => dispatch(brandAdd(categoryId, name)),
  addProduct: (brandId, name) => dispatch(productAdd(brandId, name)),
  deleteNode: (type, id) => dispatch(nodeDelete(type, id)),
});
const mapStateToProps = state => ({
  entities: getEntities(state),
  categories: getCategories(state),
  getCategoryBrands: categoryId => getCategoryBrands(state, categoryId),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
