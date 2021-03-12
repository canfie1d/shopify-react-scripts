import { createContext, useReducer } from 'react';
import Reducer from './AppReducer';

let cart = JSON.parse(localStorage.getItem('cart'));
if (cart === null) {
  cart = {
    items: {},
  };
}
cart.open = false;

const initialState = {
  header: [],
  cart,
  collection: [],
  data: [],
  product: [],
  homepage: [],
  page: [],
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);

export default Store;
