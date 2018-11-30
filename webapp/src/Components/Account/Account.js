import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import WorkingTile from '../WorkingTile/WorkingTile';
import AccountForm from '../AccountForm/AccountForm';
import PasswordChangeForm from '../PasswordChangeForm/PasswordChangeForm';

const Account = ({ user }) => (
  <Container id="workspace">
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Account
          </h3>
          <AccountForm user={user} />
        </WorkingTile>
      </Col>
    </Row>
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Change Password
          </h3>
          <PasswordChangeForm />
        </WorkingTile>
      </Col>
    </Row>
  </Container>
);

Account.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool,
  }).isRequired,
};

export default Account;
