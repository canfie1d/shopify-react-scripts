import { useContext } from 'react';
import Context from './Contexts/AppStore';

const VariantSelector = props => {
  const [state, dispatch] = useContext(Context); // eslint-disable-line

  const logChange = e => {
    let variantId = e.target.value;
    let variantPrice = props.variants[variantId].price;
    let variantComparePrice = props.variants[variantId].compare_at_price;
    dispatch({
      type: 'CHANGE_SELECTED_VARIANT',
      payload: {
        id: variantId,
        price: variantPrice,
        comparePrice: variantComparePrice,
      },
    });
  };

  let variants = props.variants;
  let options = Object.keys(variants).map(id => (
    <option value={variants[id].id} key={variants[id].id}>
      {variants[id].title}
    </option>
  ));
  return (
    <select className="product__variants" onChange={logChange}>
      {options}
    </select>
  );
};

export default VariantSelector;
