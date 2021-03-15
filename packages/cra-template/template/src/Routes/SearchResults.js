import { useState, useEffect, useContext } from 'react';
import Context from './Contexts/AppStore';
import { useLocation } from 'react-router-dom';
import SearchItem from './SearchItem';
import { changeSeo, hideLoadingIndicator } from '../../helpers/helpers';
import './search.css';

const SearchResults = props => {
  const [state] = useContext(Context);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [searchExpression, setSearchExpression] = useState('');

  // componentWillMount
  useEffect(() => {
    const data = state.data;
    let search = location.search;
    search = search.split('=')[1];
    search = search.toLowerCase();

    setSearchExpression(search);

    let results = [];
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (data[i].hasOwnProperty('vendor')) {
        if (
          data[i].title.toLowerCase().includes(search) ||
          data[i].slug.toLowerCase().includes(search) ||
          data[i].type.toLowerCase().includes(search) ||
          data[i].vendor.toLowerCase().includes(search) ||
          data[i].description.toLowerCase().includes(search) ||
          data[i].content.toLowerCase().includes(search)
        ) {
          results.push(i);
        }
      } else {
        if (
          data[i].title.toLowerCase().includes(search) ||
          data[i].content.toLowerCase().includes(search)
        ) {
          results.push(i);
        }
      }
    }

    setSearchResults(results);
  }, []);

  // componentWillReceiveProps
  useEffect(() => {
    const data = state.data;
    const newData = nextProps.data;
    let oldLength = Object.keys(data).length;
    let newLength = Object.keys(newData).length;
    let search = location.search;
    let newSearch = false;
    search = search.split('=')[1];
    search = search.toLowerCase();
    if (search !== searchExpression) {
      setState({
        searchResults: [],
        searchExpression: search,
      });
      oldLength = 0;
      newSearch = true;
    }
    let results = [];
    for (let i = oldLength; i < newLength; i++) {
      if (newData[i].hasOwnProperty('vendor')) {
        if (
          newData[i].title.toLowerCase().includes(search) ||
          newData[i].slug.toLowerCase().includes(search) ||
          newData[i].type.toLowerCase().includes(search) ||
          newData[i].vendor.toLowerCase().includes(search) ||
          newData[i].description.toLowerCase().includes(search) ||
          newData[i].content.toLowerCase().includes(search)
        ) {
          results.push(i);
        }
      } else {
        if (
          newData[i].title.toLowerCase().includes(search) ||
          newData[i].content.toLowerCase().includes(search)
        ) {
          results.push(i);
        }
      }
    }
    if (!newSearch) results = searchResults.concat(results);
    setSearchResults(results);
  }, [state.data]);

  // componentDidUpdate
  useEffect(() => {
    if (
      Object.keys(state.header).length !== 0 &&
      Object.keys(state.data).length !== 0
    ) {
      changeSeo('', state.header.shop_name, 'Search page', 'Search');
      hideLoadingIndicator();
    }
  }, [state.header, state.data, state.header.shop_name]);

  const data = state.data;
  let search = location.search;
  search = search.split('=')[1];
  search = search.toLowerCase();
  let searchResultsItems = Object.keys(searchResults).map(key => {
    if (data[searchResults[key]].hasOwnProperty('vendor')) {
      return <SearchItem item={data[searchResults[key]]} product />;
    } else {
      return <SearchItem item={data[searchResults[key]]} page />;
    }
  });
  return (
    <div className="search-results page-width">
      <h3 className="search-results__title">Search results for "{search}":</h3>
      {searchResultsItems}
    </div>
  );
};

export default SearchResults;
