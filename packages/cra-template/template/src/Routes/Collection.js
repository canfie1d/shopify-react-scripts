import { useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { useLocation } from 'react-router-dom';
import Products from './Products';
import Pagination from './Pagination';
import Hero from './Hero';
import {
  showLoadingIndicator,
  getData,
  hideLoadingIndicator,
  changeSeo,
} from '../../helpers/helpers';

const Collection = props => {
  const [state] = useContext(Context);

  const location = useLocation();

  // componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let collection = location.pathname;
    let page = location.search;
    page = page.split('=')[1];
    if (page === '') {
      page = 1;
    }
    if (collection === '/') {
      collection = '/collections/home';
    }
    getData(collection, 'collection', page);
  }, []); // eslint-disable-line

  // componentWillReceiveProps(nextProps)
  useEffect(() => {
    let newCollection = location.pathname;
    let newPage = location.search;
    if (newPage !== location.search) {
      showLoadingIndicator();
    }
    if (newCollection !== location.pathname) {
      showLoadingIndicator();
      if (newCollection === '/') {
        newCollection = '/collections/home';
      }
      getData(newCollection, 'collection');
    }
  }, [location.pathname, location.search]);

  // componentDidUpdate
  useEffect(() => {
    if (
      location.pathname !== '/' &&
      Object.keys(state.header).length !== 0 &&
      Object.keys(state.collection).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(state.collection, state.header.shop_name);
    }
  }, [
    location.pathname,
    state.header,
    state.header.shop_name,
    state.collection,
  ]);

  let products, pagination;
  let collection = state.collection;
  let hero;
  let template = state.template;
  if (Object.keys(collection).length !== 0) {
    products = <Products products={collection.products} />;
    if (collection.pages > 1) {
      pagination = (
        <Pagination pages={collection.pages} collection={location.pathname} />
      );
    }
    if (template !== 'home') {
      hero = <Hero title={collection.title} image={collection.image} />;
    }
  }

  return (
    <div className="collection">
      {hero}
      <div className="collection-content page-width">
        {products}
        {pagination}
      </div>
    </div>
  );
};

export default Collection;
