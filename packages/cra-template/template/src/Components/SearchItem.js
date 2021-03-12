import { Link } from 'react-router-dom';

const SearchItem = props => {
  const item = this.props.item;
  const product = this.props.product;
  let url;
  let content;
  if (product) {
    content = item.description;
    url = '/products/' + item.slug;
  } else {
    content = item.excerpt;
    url = '/pages/' + item.slug;
  }
  return (
    <Link to={url} className="search-item">
      <h2 className="search-item__title">{item.title}</h2>
      <div
        className="search-item__content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Link>
  );
};

export default SearchItem;
