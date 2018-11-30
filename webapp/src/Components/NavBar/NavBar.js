import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
} from 'reactstrap';
import { showOverlay } from '../../redux/actions/overlay';
import { resetUser } from '../../redux/actions/user';
import './NavBar.css';

class NavBar extends Component {
  static propTypes = {
    user: PropTypes.shape({
      isAuthorized: PropTypes.bool,
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  logOut = () => {
    localStorage.clear();
    const { dispatch } = this.props;
    dispatch(resetUser());
  };

  close = () => {
    const { isOpen } = this.state;
    if (isOpen) this.toggle();
  };

  toggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    const { user, dispatch } = this.props;
    const { isOpen } = this.state;
    return (
      <div id="main-navbar">
        <Navbar color="main-green" light expand="md">
          <NavbarBrand className="mb-0 h1" href="/">
            Datomatica
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink tag={Link} to="/" onClick={this.close}>
                  Main
                </NavLink>
              </NavItem>

              {user.isAuthorized ? (
                <React.Fragment>
                  <NavItem>
                    <NavLink href="#">
About us
                    </NavLink>
                  </NavItem>
                  <NavItem className="right-gap">
                    <NavLink tag={Link} to="/dashboard" onClick={this.close}>
                      Dashboard
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={() => {
                        this.logOut();
                        this.close();
                      }}
                    >
                      Log out
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <NavItem className="right-gap">
                    <NavLink href="#" onClick={this.close}>
                      About us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={() => {
                        dispatch(showOverlay('signUpForm'));
                        this.close();
                      }}
                    >
                      Sign up
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      onClick={() => {
                        dispatch(showOverlay('loginForm'));
                        this.close();
                      }}
                    >
                      Log in
                    </NavLink>
                  </NavItem>
                </React.Fragment>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(NavBar);
