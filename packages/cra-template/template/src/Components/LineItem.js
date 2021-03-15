import { useContext } from 'react';
import { Context } from '../Contexts/AppStore';

const LineItem = props => {
  const [state, dispatch] = useContext(Context); // eslint-disable-line

  const decrementQuantity = () => {
    const operation = 'decrement';
    if (props.line_item.quantity > 1) {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: props.id, operation: operation },
      });
    }
  };

  const incrementQuantity = () => {
    const operation = 'increment';
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: props.id, operation: operation },
    });
  };

  const removeLineItemFromCart = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id: props.id } });
  };

  let variant;
  if (props.line_item.option !== 'Title')
    variant = props.line_item.option + ' / ' + props.line_item.variant;

  return (
    <li className="Line-item">
      <div className="Line-item__img">
        {props.line_item.image ? (
          <img
            src={props.line_item.image}
            alt={`${props.line_item.title} product shot`}
          />
        ) : null}
      </div>
      <div className="Line-item__content">
        <div className="Line-item__content-row">
          <div className="Line-item__variant-title">{variant}</div>
          <span className="Line-item__title">{props.line_item.title}</span>
        </div>
        <div className="Line-item__content-row">
          <div className="Line-item__quantity-container">
            <button
              className="Line-item__quantity-update"
              onClick={decrementQuantity}
            >
              -
            </button>
            <span className="Line-item__quantity">
              {props.line_item.quantity}
            </span>
            <button
              className="Line-item__quantity-update"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
          <span className="Line-item__price">
            {props.currency}{' '}
            {(props.line_item.quantity * props.line_item.price).toFixed(2)}
          </span>
          <button
            className="Line-item__remove"
            onClick={removeLineItemFromCart}
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
};

export default LineItem;
