import React from 'react';
import { Container, Row } from 'reactstrap';
import ReasonCard from '../ReasonCard/ReasonCard';

import './SectionWhy.css';

const SectionWhy = () => (
  <div id="rect1">
    <Container fluid id="sectionWhy" className="pt-4 pb-5">
      <h1 className="text-center mt-4 mb-5 text-white">
Why Datomatica?
      </h1>

      <Row>
        <ReasonCard />
        <ReasonCard />
        <ReasonCard />
      </Row>
    </Container>
  </div>
);

export default SectionWhy;
