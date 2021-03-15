import { useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { hideLoadingIndicator, changeSeo } from '../../helpers/helpers';

const NotFound = props => {
  const [state] = useContext(Context);

  useEffect(() => {
    if (Object.keys(state.header).length !== 0) hideLoadingIndicator();
    changeSeo(
      '',
      state.header.shop_name,
      'This page was not found on this site.',
      '404 Not Found'
    );
  }, [state.header]);

  return (
    <div className="not-found page-width">
      <h1 className="not-found__title">404 Not Found</h1>
    </div>
  );
};

export default NotFound;
