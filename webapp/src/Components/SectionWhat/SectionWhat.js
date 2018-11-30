import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './SectionWhat.css';

const SectionWhat = () => (
  <Container fluid id="sectionWhat">
    <Row>
      <Col md={{ size: 8, offset: 2 }} className="text-center">
        <h1>
What is Datomatica?
        </h1>
        <p className="text-secondary text-left">
          Augue neque metus et egestas aliquam augue magnis elementum. Mus ridiculus volutpat
          aliquet. Fusce feugiat. Tristique. Neque nulla interdum sollicitudin semper fermentum.
          Habitant consectetuer lectus dictumst in condimentum, curabitur cum accumsan. Vel
          convallis curae; donec, semper vel natoque pretium dui. Accumsan. Tincidunt risus habitant
          sollicitudin nunc varius aptent. Mauris potenti primis vivamus. Mus nisl integer dignissim
          fringilla eu ante pellentesque vehicula hymenaeos parturient tortor scelerisque euismod
          vel cursus ultrices fusce aptent sagittis, porta sociosqu, laoreet sodales lacinia Fusce
          volutpat cursus taciti Purus aptent imperdiet. Magna urna dapibus pede eget pretium nostra
          lorem lectus suscipit purus egestas mi sollicitudin urna nullam torquent felis, euismod.
          Lacus eleifend dolor eget eu lectus mi suscipit.
        </p>
      </Col>
    </Row>
  </Container>
);
export default SectionWhat;
