import React from 'react';
import './Footer.css';

import {
  Collapse, Navbar, Nav, NavItem, NavLink,
} from 'reactstrap';

const Footer = () => (
  <Navbar id="footer" expand="md" className="text-center navbar-dark">
    <Collapse isOpen navbar>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="#">
Docs
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
Support
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
Terms of Service
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
Privacy
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className="text-white ml-4">
© 2018 Datomatica
          </NavLink>
        </NavItem>
      </Nav>
    </Collapse>
  </Navbar>
);

export default Footer;
