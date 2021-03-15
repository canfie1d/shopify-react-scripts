import BrowserRouter from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import Routes from './routes';
import Cart from './cart/Cart';
import Store from './Contexts/AppStore';

const App = props => {
  return (
    <div id="main">
      <Store>
        <Header
          header={props.header}
          history={props.history}
          location={props.location}
        />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Footer />
        <Cart cart={props.cart} />
      </Store>
    </div>
  );
};

export default App;
