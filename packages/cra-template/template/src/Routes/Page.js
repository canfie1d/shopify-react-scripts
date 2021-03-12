import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  showLoadingIndicator,
  getData,
  hideLoadingIndicator,
  changeSeo,
} from '../../helpers/helpers';
import './page.css';

const Page = props => {
  const location = useLocation();

  //componentWillMount
  useEffect(() => {
    showLoadingIndicator();
    let page = props.location.pathname;
    getData(page, 'page');
  }, []);

  // componentWillReceiveProps
  useEffect(() => {
    let newPage = location.pathname;
    let currentPage = props.location.pathname;
    if (newPage !== currentPage) {
      showLoadingIndicator();
      getData(newPage, 'page');
    }
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (
      Object.keys(props.page).length !== 0 &&
      Object.keys(props.header).length !== 0
    ) {
      hideLoadingIndicator();
      changeSeo(props.page, props.header.shop_name);
    }
  }, [props.page, props.header, props.header.shop_name]);

  const page = props.page;
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
