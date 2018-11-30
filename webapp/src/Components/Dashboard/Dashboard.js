import React, { Component } from 'react';
import { Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import searchToData from '../../redux/selectors/searchToData';
import Sidebar from '../Sidebar/Sidebar';
import TabBar from '../TabBar/TabBar';
import Charts from '../Charts/Charts';
import Account from '../Account/Account';
import Settings from '../Settings/Settings';
import DataImport from '../DataImport/DataImport';
import './Dashboard.css';

const pageMap = {
  charts: [
    {
      id: 0,
      path: '/dashboard?section=charts&model=maxes&tabId=0',
      text: 'Maxes',
    },
    {
      id: 1,
      path: '/dashboard?section=charts&model=model1&tabId=1',
      text: 'Model 1',
    },
    {
      id: 2,
      path: '/dashboard?section=charts&model=model2&tabId=2',
      text: 'Model 2',
    },
  ],

  settings: [
    {
      id: 0,
      path: '/dashboard?section=settings',
      text: 'Settings',
    },
  ],

  import: [
    {
      id: 0,
      path: '/dashboard?section=import',
      text: 'Import',
    },
  ],

  account: [
    {
      id: 0,
      path: '/dashboard?section=account',
      text: 'Account',
    },
  ],
};

class Dashboard extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isAuthorized: PropTypes.bool,
    }).isRequired,
    section: PropTypes.string.isRequired,
    tabId: PropTypes.number.isRequired,
  };

  workspace = (section) => {
    const { user } = this.props;
    const sectionMap = {
      charts: <Charts />,
      settings: <Settings />,
      account: <Account user={user} />,
      import: <DataImport user={user} />,
    };
    return sectionMap[section];
  };

  render() {
    const { section, tabId } = this.props;

    return (
      <React.Fragment>
        <TabBar tabs={pageMap[section]} tabId={tabId} />

        <Row className="mr-0 ml-0">
          <Sidebar />
          <div id="workspace-column" className="col">
            {this.workspace(section)}
          </div>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ user, router }) => ({
  user,
  ...searchToData(router),
});

export default connect(mapStateToProps)(Dashboard);
