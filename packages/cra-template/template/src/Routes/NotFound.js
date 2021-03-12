import { useEffect } from 'react';
import { hideLoadingIndicator, changeSeo } from '../../helpers/helpers';

const NotFound = props => {
  useEffect(() => {
    if (Object.keys(props.header).length !== 0) hideLoadingIndicator();
    changeSeo(
      '',
      props.header.shop_name,
      'This page was not found on this site.',
      '404 Not Found'
    );
  }, [props.header]);

  return (
    <div className="not-found page-width">
      <h1 className="not-found__title">404 Not Found</h1>
    </div>
  );
};

export default NotFound;
