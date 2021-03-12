import Header from './header/Header';
import Footer from './footer/Footer';
import Routes from './routes';
import Cart from './cart/Cart';

const App = props => {
  return (
    <div id="main">
      <Header
        header={props.header}
        history={props.history}
        location={props.location}
      />
      <Store>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Store>
      <Footer />
      <Cart cart={props.cart} />
    </div>
  );
};

export default App;
