import { useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { getData, hideLoadingIndicator } from '../../helpers/helpers';
import Hero from './Hero';
import Collection from '../collection/Collection';

const HomePage = props => {
  const [state] = useContext(Context);

  useEffect(() => {
    getData('/pages/home', 'home');
  }, []);

  useEffect(() => {
    if (
      Object.keys(state.header).length !== 0 &&
      Object.keys(state.collection).length !== 0
    ) {
      hideLoadingIndicator();
    }
  }, [state.header, state.collection]);

  let hero;
  if (Object.keys(props.homepage).length !== 0) {
    if (state.homepage.hasOwnProperty('hero')) {
      hero = <Hero data={props.homepage.hero} />;
    }
  }
  return (
    <div className="home-page">
      {hero}
      <Collection {...props} template="home" />
    </div>
  );
};

export default HomePage;
