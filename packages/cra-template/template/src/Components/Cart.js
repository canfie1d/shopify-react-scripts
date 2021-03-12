import LineItem from './LineItem';
import * as actions from '../../actions/actionCreators';
import { shopifyStoreUrl } from '../../helpers/helpers';

const Cart = props => {
  const [state, dispatch] = useContext(Context);

  const closeCart = () => {
    dispatch(actions.closeCart());
  };

  const openCheckout = url => {
    localStorage.removeItem('cart');
    window.location = url;
  };

  const cart = props.cart;
  let cartStatus = cart.open;
  let line_items = 'Cart is empty',
    subtotal = 0;
  let line_items_number = Object.keys(cart.items).length;
  let checkoutUrl = shopifyStoreUrl + '/cart/';
  if (line_items_number !== 0) {
    line_items = Object.keys(cart.items).map(line_item => {
      subtotal += cart.items[line_item].quantity * cart.items[line_item].price;
      checkoutUrl += line_item + ':' + cart.items[line_item].quantity + ',';

      return (
        <LineItem
          key={line_item}
          id={line_item}
          line_item={cart.items[line_item]}
          currency={cart.currency}
        />
      );
    });
  }

  return (
    <div className={`Cart ${cartStatus ? 'Cart--open' : ''}`}>
      <header className="Cart__header">
        <h2>Your cart</h2>
        <button onClick={closeCart} className="Cart__close">
          &#10006;
        </button>
      </header>
      <ul className="Cart__line-items">{line_items}</ul>
      <footer className="Cart__footer">
        <div className="Cart-info clearfix">
          <div className="Cart-info__total Cart-info__small">Subtotal</div>
          <div className="Cart-info__pricing">
            <span className="pricing">
              {cart.currency} {subtotal}
            </span>
          </div>
        </div>
        <button
          className="Cart__checkout button"
          onClick={() => openCheckout(checkoutUrl)}
        >
          Checkout
        </button>
        <p className="add-info">Shipping &amp; taxes calculated at checkout</p>
      </footer>
    </div>
  );
};

export default Cart;
