import React from 'react';
import {
  Container, Row, Col, Button,
} from 'reactstrap';

import './Illustration.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showOverlay } from '../../redux/actions/overlay';
import how from './How.svg';
import howMobile from './How_Mobile.svg';

const Illustration = ({ dispatch }) => (
  <div id="how" className="w-100">
    <div id="rect2" />
    <Container fluid className="pt-4 pb-5 d-none d-md-block">
      <Row className="mt-5">
        <Col className="text-center mt-4 mb-5">
          <h1 className="text-white">
How it works?
          </h1>
        </Col>
      </Row>
      <Row>
        <div id="how-wrapper" className="mx-auto">
          <img src={how} alt="how it works" className="img-fluid mx-auto" />
        </div>
      </Row>
      <Row>
        <Col className="text-center mt-5 pt-5">
          <Button
            color="main-green"
            size="lg"
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(showOverlay('signUpForm'));
            }}
          >
            Join Now
          </Button>
        </Col>
      </Row>
    </Container>

    <Container fluid className="pt-4 pb-5 d-block d-md-none">
      <Row className="mt-5">
        <Col className="text-center mt-4 mb-5">
          <h1 className="text-white">
How it works?
          </h1>
        </Col>
      </Row>
      <Row>
        <div id="how-wrapper" align="center">
          <img src={howMobile} alt="how it works" className="img-fluid mx-auto" />
        </div>
      </Row>
      <Row>
        <Col className="text-center mt-5 pt-5">
          <Button
            color="main-green"
            size="lg"
            onClick={() => {
              window.scrollTo(0, 0);
              dispatch(showOverlay('signUpForm'));
            }}
          >
            Join Now
          </Button>
        </Col>
      </Row>
    </Container>
  </div>
);

Illustration.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Illustration);
