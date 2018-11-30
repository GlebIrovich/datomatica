import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TabBarItem = ({ path, isActive, text }) => (
  <Link to={path} className={`float-left ${isActive ? 'active' : ''}`}>
    <p>
      {text}
    </p>
  </Link>
);

TabBarItem.propTypes = {
  path: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

export default TabBarItem;
