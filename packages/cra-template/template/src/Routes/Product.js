import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VariantSelector from './VariantSelector';
import ProductImages from './ProductImages';
import {
  showLoadingIndicator,
  getData,
  hideLoadingIndicator,
  changeSeo,
} from '../../helpers/helpers';
import * as actions from '../../actions/actionCreators';

const Product = props => {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  //componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let productUrl = props.location.pathname;
    getData(productUrl, 'product');
  }, []);

  // componentWillReceiveProps
  useEffect(() => {
    let newProduct = location.pathname;
    let currentProduct = props.location.pathname;
    if (newProduct !== currentProduct) {
      showLoadingIndicator();
      getData(newProduct, 'product');
    }
  }, [location.pathname]);

  //componentDidUpdate
  useEffect(() => {
    if (
      Object.keys(props.product).length !== 0 &&
      Object.keys(props.header).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(props.product, props.header.shop_name);
    }
  }, [props.product, props.header, props.header.shop_name]);

  const addVariantToCart = () => {
    let product = props.product;
    let variantId = props.product.selected_variant;
    let currency = props.product.currency;
    let cartObject = {
      title: product.title,
      image: product.featured_image,
      price: product.variants[variantId].price,
      quantity: product.selected_quantity,
      option: product.options[0],
      variant: product.variants[variantId].title,
    };
    dispatch(actions.addVariantToCart(cartObject, variantId, currency));
    if (!props.cart.open) dispatch(actions.openCart());
  };
  const quantityChange = e => {
    let quantity = parseInt(e.target.value, 10);
    dispatch(actions.changeSelectedQuantity(quantity));
  };

  let variantSelectors, comparePrice, productImages;
  let product = props.product;
  if (Object.keys(product).length !== 0) {
    if (Object.keys(product.variants).length > 1)
      variantSelectors = <VariantSelector variants={product.variants} />;
    if (Object.keys(product.product_images).length > 1)
      productImages = <ProductImages images={product.product_images} />;
    if (product.selected_compare_price !== '')
      comparePrice = (
        <span className="product__compare-price">
          {product.currency + product.selected_compare_price}
        </span>
      );
  }
  return (
    <div className="product-template page-width">
      <div className="grid">
        <div className="grid__item medium-up--one-half">
          <img
            className="featured-image"
            src={product.featured_image}
            alt={product.title}
          />
          {productImages}
        </div>
        <div className="grid__item medium-up--one-half">
          <h1 className="product__title">{product.title}</h1>
          <span className="product__price">
            {product.currency + product.selected_price}
          </span>
          {comparePrice}
          <p
            className="product__description"
            dangerouslySetInnerHTML={{ __html: product.content }}
          />
          {variantSelectors}
          <label className="product__quantity">
            Quantity
            <input
              min="1"
              type="number"
              defaultValue="1"
              onChange={quantityChange}
            />
          </label>
          <button className="product__buy button" onClick={addVariantToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
