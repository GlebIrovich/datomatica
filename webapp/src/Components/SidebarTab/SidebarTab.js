import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

const SidebarTab = ({ tab }) => (
  <Link to={tab.path} className={`${tab.className}`}>
    <FontAwesome name={tab.icon} />
    <span className="text d-none d-md-inline">
      {tab.text}
    </span>
    {tab.icon === 'user-circle' ? <hr /> : ''}
  </Link>
);

SidebarTab.propTypes = {
  tab: PropTypes.shape({
    path: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
};

export default SidebarTab;
