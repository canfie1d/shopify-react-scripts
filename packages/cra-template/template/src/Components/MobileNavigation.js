import { NavLink } from 'react-router-dom';
import MobileSearch from './MobileSearch';

const MobileNavigation = props => {
  let listOfItems = props.items;
  let status = props.status;
  let items = Object.keys(listOfItems).map(item => {
    return (
      <li key={item} className="mobile-nav__item">
        <NavLink exact activeClassName="active" to={listOfItems[item].url}>
          {listOfItems[item].title}
        </NavLink>
      </li>
    );
  });

  return (
    <nav
      className={`mobile-nav-wrapper medium-up--hide ${status ? 'open' : ''}`}
    >
      <MobileSearch />
      <ul className="mobile-nav">{items}</ul>
    </nav>
  );
};

export default MobileNavigation;
