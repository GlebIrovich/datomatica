import React from 'react';
import './Banner.css';
import { Jumbotron, Container } from 'reactstrap';
import tomato from './tomato2.png';

const Banner = () => (
  <Jumbotron fluid id="main-banner" className="w-100">
    <div id="red-part" />
    <Container>
      <p className="h1 text-center">
Datomatica
      </p>
      <p className="h2 text-center">
Juicy data insights
      </p>
      <img src={tomato} className="img-fluid mx-auto d-block" id="banner-tomato" alt="tomato" />
    </Container>
  </Jumbotron>
);

export default Banner;
