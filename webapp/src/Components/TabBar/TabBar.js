import React from 'react';
import './TabBar.css';
import PropTypes from 'prop-types';
import TabBarItem from '../TabBarItem/TabBarItem';

const TabBar = ({ tabs, tabId }) => (
  <div id="tabbar" className="pt-2">
    {tabs.map((tab, index) => <TabBarItem isActive={index === tabId} {...tab} key={tab.id} />)}
  </div>
);

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  tabId: PropTypes.number,
};

TabBar.defaultProps = {
  tabId: 0,
};

export default TabBar;
