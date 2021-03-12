import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getData } from '../../helpers/helpers';

const Navigation = props => {
  // componentDidMount
  useEffect(() => {
    let listOfItems = props.items;
    Object.keys(listOfItems).map(item => {
      let url = listOfItems[item].url;
      if (url.includes('pages')) {
        getData(url, 'page', false, true);
      }
      return null;
    });
  }, []);

  let listOfItems = props.items;
  let items = Object.keys(listOfItems).map(item => {
    let dropdown = listOfItems[item].dropdown;
    if (Object(dropdown).length !== 0) {
      let dropdownItems = Object.keys(dropdown).map(item => {
        return (
          <li key={item} className="dropdown__item">
            <NavLink exact activeClassName="active" to={dropdown[item].url}>
              {dropdown[item].title}
            </NavLink>
          </li>
        );
      });
      return (
        <li key={item} className="nav-item has-dropdown">
          <NavLink exact activeClassName="active" to={listOfItems[item].url}>
            {listOfItems[item].title}
          </NavLink>
          <ul className="nav-item__dropdown">{dropdownItems}</ul>
        </li>
      );
    } else {
      return (
        <li key={item} className="nav-item">
          <NavLink exact activeClassName="active" to={listOfItems[item].url}>
            {listOfItems[item].title}
          </NavLink>
        </li>
      );
    }
  });
  return <ul className="site-nav">{items}</ul>;
};

export default Navigation;
