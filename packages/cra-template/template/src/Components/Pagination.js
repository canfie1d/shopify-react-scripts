import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getData } from '../../helpers/helpers';

const Pagination = props => {
  const loadNewPage = (collection, page) => {
    getData(collection, 'collection', page);
  };

  let pages = props.pages;
  let navLinks = [];
  let collection = props.collection;
  for (let i = 1; i <= pages; i++) {
    navLinks.push(
      <li key={i}>
        <Link
          to={`${collection}?page=${i}`}
          onClick={() => loadNewPage(collection, i)}
        >
          {i}
        </Link>
      </li>
    );
  }
  return <ul className="pagination">{navLinks}</ul>;
};

export default Pagination;
