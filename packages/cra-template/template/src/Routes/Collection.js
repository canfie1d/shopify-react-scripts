import { useEffect } from 'react';
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
  const location = useLocation();

  // componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let collection = props.location.pathname;
    let page = props.location.search;
    page = page.split('=')[1];
    if (page === '') {
      page = 1;
    }
    if (collection === '/') {
      collection = '/collections/home';
    }
    getData(collection, 'collection', page);
  }, []);

  // componentWillReceiveProps(nextProps)
  useEffect(() => {
    let newCollection = props.location.pathname;
    let newPage = props.location.search;
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
  }, [props.location.pathname, props.location.search]);

  // componentDidUpdate
  useEffect(() => {
    if (
      props.location.pathname !== '/' &&
      Object.keys(props.header).length !== 0 &&
      Object.keys(props.collection).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(props.collection, props.header.shop_name);
    }
  }, [
    props.location.pathname,
    props.header,
    props.header.shop_name,
    props.collection,
  ]);

  let products, pagination;
  let collection = props.collection;
  let hero;
  let template = props.template;
  if (Object.keys(collection).length !== 0) {
    products = <Products products={collection.products} />;
    if (collection.pages > 1) {
      pagination = (
        <Pagination
          pages={collection.pages}
          collection={props.location.pathname}
        />
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
