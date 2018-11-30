import React from 'react';
import { Container, Col, Row } from 'reactstrap';
import WorkingTile from '../WorkingTile/WorkingTile';

const Settings = () => (
  <Container id="workspace">
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Settings 1
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisi in augue eleifend
            pulvinar nec a neque. Pellentesque lacus lorem, porttitor id turpis consectetur, aliquet
            condimentum turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Praesent id ornare nisl. Ut id luctus felis. Praesent imperdiet
            nisi in orci suscipit eleifend. Proin laoreet, magna in blandit ullamcorper, lorem dolor
            rutrum velit, a iaculis erat urna porttitor nisl.
          </p>
        </WorkingTile>
      </Col>
    </Row>
    <Row>
      <Col>
        <WorkingTile>
          <h3>
Settings 2
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at nisi in augue eleifend
            pulvinar nec a neque. Pellentesque lacus lorem, porttitor id turpis consectetur, aliquet
            condimentum turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia Curae; Praesent id ornare nisl. Ut id luctus felis. Praesent imperdiet
            nisi in orci suscipit eleifend. Proin laoreet, magna in blandit ullamcorper, lorem dolor
            rutrum velit, a iaculis erat urna porttitor nisl.
          </p>
        </WorkingTile>
      </Col>
    </Row>
  </Container>
);

export default Settings;
