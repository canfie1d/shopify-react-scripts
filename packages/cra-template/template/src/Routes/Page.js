import { useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { useLocation } from 'react-router-dom';
import {
  showLoadingIndicator,
  getData,
  hideLoadingIndicator,
  changeSeo,
} from '../../helpers/helpers';
import './page.css';

const Page = props => {
  const [state, dispatch] = useContext(Context);
  const location = useLocation();

  //componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let page = location.pathname;
    getData(page, 'page');
  }, []);

  // componentWillReceiveProps
  useEffect(() => {
    let newPage = location.pathname;
    let currentPage = location.pathname;
    if (newPage !== currentPage) {
      showLoadingIndicator();
      getData(newPage, 'page');
    }
  }, [location.pathname]);

  // componentDidUpdate
  useEffect(() => {
    if (
      Object.keys(state.page).length !== 0 &&
      Object.keys(state.header).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(state.page, state.header.shop_name);
    }
  }, [state.page, state.header, state.header.shop_name]);

  const page = state.page;
  let title, content;
  if (Object.keys(page).length !== 0) {
    title = <h1 className="page__title">{page.title}</h1>;
    content = (
      <div
        className="page__content"
        dangerouslySetInnerHTML={{ __html: page.content }}
      />
    );
  }

  return (
    <div className="page-template page-width">
      {title}
      {content}
    </div>
  );
};

export default Page;
