import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import WorkingTile from '../WorkingTile/WorkingTile';
import UploadForm from '../UploadForm/UploadForm';
import OAuthForm from '../OAuthForm/OAuthForm';

const DataImport = () => (
  <Container id="workspace">
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Manual Upload
          </h3>

          <UploadForm />
        </WorkingTile>
      </Col>
    </Row>
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Woocommerce Login
          </h3>
          <OAuthForm />
        </WorkingTile>
      </Col>
    </Row>
  </Container>
);

export default DataImport;
