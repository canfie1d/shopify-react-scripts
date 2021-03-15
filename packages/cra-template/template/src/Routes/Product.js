import { useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { useLocation } from 'react-router-dom';
import VariantSelector from './VariantSelector';
import ProductImages from './ProductImages';
import {
  showLoadingIndicator,
  getData,
  hideLoadingIndicator,
  changeSeo,
} from '../../helpers/helpers';

const Product = props => {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();
  //componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let productUrl = location.pathname;
    getData(productUrl, 'product');
  }, []); // eslint-disable-line

  // componentWillReceiveProps
  useEffect(() => {
    let newProduct = location.pathname;
    let currentProduct = location.pathname;
    if (newProduct !== currentProduct) {
      showLoadingIndicator();
      getData(newProduct, 'product');
    }
  }, [location.pathname]);

  //componentDidUpdate
  useEffect(() => {
    if (
      Object.keys(state.product).length !== 0 &&
      Object.keys(state.header).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(state.product, state.header.shop_name);
    }
  }, [state.product, state.header, state.header.shop_name]);

  const addVariantToCart = () => {
    let product = state.product;
    let variantId = state.product.selected_variant;
    let currency = state.product.currency;
    let cartObject = {
      title: product.title,
      image: product.featured_image,
      price: product.variants[variantId].price,
      quantity: product.selected_quantity,
      option: product.options[0],
      variant: product.variants[variantId].title,
    };
    dispatch({
      type: 'ADD_VARIANT_TO_CART',
      payload: { id: variantId, product: cartObject, currency: currency },
    });
    if (!state.cart.open) dispatch({ type: 'OPEN_CART' });
  };
  const quantityChange = e => {
    let quantity = parseInt(e.target.value, 10);
    dispatch({ type: 'UPDATE_QUANTITY', payload: { quantity: quantity } });
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
