import React from 'react';
import { Col } from 'reactstrap';
import './ReasonCard.css';
import TrackVisibility from 'react-on-screen';
import posed from 'react-pose';

const FontAwesome = require('react-fontawesome');

const config = {
  up: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 400,
      type: 'spring',
      stiffness: 90,
    },
  },
  down: {
    y: 100,
    opacity: 0,
  },
};
const Box = posed.div(config);

const ReasonCard = () => (
  <Col xs={{ size: 10 }} sm={{ size: 6 }} md={{ size: 4 }} className="text-center mx-auto">
    <TrackVisibility partialVisibility>
      {({ isVisible }) => (
        <Box pose={isVisible ? 'up' : 'down'}>
          <div className="green-back mx-auto">
            <div className="white-back">
              <h4>
Reason
              </h4>

              <FontAwesome name="rocket" className="card-icon" />
              <p className="text-secondary">
                Bibendum leo imperdiet hymenaeos erat metus vel odio eleifend semper Lorem posuere
                maecenas nunc enim sapien sollicitudin facilisis orci facilisi facilisi montes class
                tristique sodales interdum faucibus eget.
              </p>
            </div>
          </div>
        </Box>
      )}
    </TrackVisibility>
  </Col>
);

export default ReasonCard;
