const Reducer = (state, action) => {
  const newState = { ...state };

  switch (action.type) {
    case 'ADD_VARIANT_TO_CART':
      if (action.id in newState.items) {
        newState.items[action.id].quantity += action.product.quantity;
      } else {
        newState.items[action.id] = action.product;
      }
      if (!newState.hasOwnProperty('currency'))
        newState['currency'] = action.currency;
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case 'UPDATE_QUANTITY':
      if (action.operation === 'increment') {
        newState.items[action.id].quantity += 1;
      } else {
        newState.items[action.id].quantity -= 1;
      }
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case 'REMOVE_ITEM':
      delete newState.items[action.id];
      localStorage.setItem('cart', JSON.stringify(newState));
      return newState;
    case 'OPEN_CART':
      return { ...state, open: true };
    case 'CLOSE_CART':
      return { ...state, open: false };
    case 'GET_COLLECTION':
      return action.data;
    case 'GET_ALL_PRODUCTS':
      const products = action.data['products'];
      Object.keys(products).map(item => newState.push(products[item]));
      return newState;
    case 'GET_ALL_PAGES':
      newState.push(action.data);
      return newState;
    case 'GET_HEADER':
      return action.data;
    case 'GET_HOME_PAGE':
      return action.data;
    case 'GET_PAGE':
      return action.data;
    case 'GET_PRODUCT':
      return action.data;
    case 'CHANGE_SELECTED_VARIANT':
      return {
        ...state,
        selected_variant: action.id,
        selected_price: action.price,
        selected_compare_price: action.comparePrice,
      };
    case 'CHANGE_SELECTED_QUANTITY':
      return { ...state, selected_quantity: action.quantity };
    case 'CHANGE_FEATURED_IMAGE':
      return { ...state, featured_image: action.image };
    default:
      return state;
  }
};

export default Reducer;
