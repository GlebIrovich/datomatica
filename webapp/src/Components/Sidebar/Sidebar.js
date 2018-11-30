import React from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import searchToData from '../../redux/selectors/searchToData';
import { toggleSidebar } from '../../redux/actions/sidebar';
import './Sidebar.css';

import SidebarTab from '../SidebarTab/SidebarTab';

const activeTab = (link, section) => {
  let status = '';
  if (link === section) status = 'active';
  return `list-group-item d-inline-block pl-0 ${status}`;
};

const Sidebar = ({
  sidebar: { className }, user, dispatch, section,
}) => (
  <React.Fragment>
    <div id="icon-bar" />
    <div id="text-bar" className={`d-none d-md-block ${className}`} />

    <div
      role="button"
      tabIndex="0"
      id="close-bar"
      className={`text-center d-none d-md-block ${className}`}
      onClick={() => dispatch(toggleSidebar())}
      onKeyPress={() => dispatch(toggleSidebar())}
    >
      <FontAwesome name={className ? 'chevron-right' : 'chevron-left'} id="close-chevron" />
    </div>
    <div id="sidebar" className={`col position-absolute pl-0 ${className}`}>
      <div className="list-group border-0 card text-center text-md-left">
        <SidebarTab
          tab={{
            path: '/dashboard?section=account',
            className: activeTab('account', section),
            icon: 'user-circle',
            text: user.username,
          }}
        />

        <SidebarTab
          tab={{
            path: '/dashboard?section=import',
            className: activeTab('import', section),
            icon: 'file-import',
            text: 'Data Import',
          }}
        />

        <SidebarTab
          tab={{
            path: '/dashboard?section=charts',
            className: activeTab('charts', section),
            icon: 'chart-area',
            text: 'Charts',
          }}
        />

        <SidebarTab
          tab={{
            path: '/dashboard?section=settings',
            className: activeTab('settings', section),
            icon: 'cog',
            text: 'Settings',
          }}
        />
      </div>
    </div>
  </React.Fragment>
);

Sidebar.propTypes = {
  section: PropTypes.string.isRequired,
  sidebar: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = ({ user, sidebar, router }) => ({
  user,
  sidebar,
  ...searchToData(router),
});

export default connect(mapStateToProps)(Sidebar);
