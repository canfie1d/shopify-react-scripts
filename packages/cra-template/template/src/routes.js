import { Switch, Route } from 'react-router-dom';
import HomePage from './Routes/home/HomePage';
import Collection from './Routes/collection/Collection';
import Product from './Routes/product/Product';
import SearchResults from './Routes/search/SearchResults';
import Page from './Routes/page/Page';
import NotFound from './Routes/404/NotFound';

const Routes = props => {
  const [state, dispatch] = useContext(Context);

  return (
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <HomePage
            homepage={props.homepage}
            collection={state.collection}
            location={props.location}
            header={props.header}
          />
        )}
      />
      <Route
        path="/collections/:handle"
        render={props => (
          <Collection
            collection={props.collection}
            location={props.location}
            header={props.header}
          />
        )}
      />
      <Route
        path="/products/:handle"
        render={props => (
          <Product
            product={props.product}
            cart={props.cart}
            location={props.location}
            header={props.header}
          />
        )}
      />
      <Route
        path="/search"
        render={props => (
          <SearchResults
            history={props.history}
            data={props.data}
            header={props.header}
          />
        )}
      />
      <Route
        path="/pages/:handle"
        render={props => (
          <Page
            page={props.page}
            location={props.location}
            header={props.header}
          />
        )}
      />
      <Route render={props => <NotFound header={props.header} />} />
    </Switch>
  );
};

export default Routes;
