import { Switch, Route } from 'react-router-dom';
import HomePage from './Routes/HomePage';
import Collection from './Routes/Collection';
import Product from './Routes/Product';
import SearchResults from './Routes/SearchResults';
import Page from './Routes/Page';
import NotFound from './Routes/NotFound';

const Routes = props => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/collections/:handle" component={Collection} />
      <Route path="/products/:handle" component={Product} />
      <Route path="/search" component={SearchResults} />
      <Route path="/pages/:handle" component={Page} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
