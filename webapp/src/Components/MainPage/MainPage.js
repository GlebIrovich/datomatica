import React from 'react';
import { Row } from 'reactstrap';
import Banner from '../Banner/Banner';
import SectionWhat from '../SectionWhat/SectionWhat';
import SectionWhy from '../SectionWhy/SectionWhy';
import Illustration from '../Illustration/Illustration';

const MainPage = () => (
  <Row className="mr-0 ml-0">
    <Banner />
    <SectionWhat />
    <SectionWhy />
    <Illustration />
  </Row>
);

export default MainPage;
