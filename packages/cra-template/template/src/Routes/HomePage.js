import { useEffect } from 'react';
import { getData, hideLoadingIndicator } from '../../helpers/helpers';
import Hero from './Hero';
import Collection from '../collection/Collection';

const HomePage = props => {
  useEffect(() => {
    helpers.getData('/pages/home', 'home');
  }, []);

  useEffect(() => {
    if (
      Object.keys(props.header).length !== 0 &&
      Object.keys(props.collection).length !== 0
    ) {
      helpers.hideLoadingIndicator();
    }
  }, [props.header, props.collection]);

  let hero;
  if (Object.keys(props.homepage).length !== 0) {
    if (homepage.hasOwnProperty('hero')) {
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
