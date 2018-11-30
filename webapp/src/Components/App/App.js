import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import MainPage from '../MainPage/MainPage';
import Dashboard from '../Dashboard/Dashboard';
import SignUpForm from '../SignUpForm/SignUpForm';
import LoginForm from '../LoginForm/LoginForm';

const App = ({ user, overlay: { loginForm, signUpForm } }) => (
  <React.Fragment>
    <div className="App">
      <NavBar />

      {signUpForm && <SignUpForm />}
      {loginForm && <LoginForm />}
      <Container fluid className="pl-0 pr-0">
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route
            path="/dashboard"
            component={() => {
              if (user.isAuthorized) {
                return <Dashboard />;
              }

              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </Container>
    </div>

    <Footer />
  </React.Fragment>
);

App.propTypes = {
  user: PropTypes.shape({
    isAuthorized: PropTypes.bool.isRequired,
  }).isRequired,
  overlay: PropTypes.shape({
    loginForm: PropTypes.bool.isRequired,
    signUpForm: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ user, overlay }) => ({
  user,
  overlay,
});

export default withRouter(connect(mapStateToProps)(App));
