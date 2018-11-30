import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { hideOverlay } from '../../redux/actions/overlay';
import { setUser } from '../../redux/actions/user';
import './LoginForm.css';

import Alert from '../Alert/Alert';

const configs = require('../../configs');

class LoginForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      alert: false,
      remember: false,
    };
  }

  handleInputChange = (e) => {
    const newStates = {};
    if (e.target.id === 'remember') {
      this.setState(state => ({
        remember: !state.remember,
      }));
    } else {
      newStates[e.target.id] = e.target.value;
      this.setState(newStates);
    }
  };

  handleValidation = (id) => {
    const { [id]: state } = this.state;
    return state !== '' ? 'is-valid' : 'is-invalid';
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // validate non-empty input
    const { email, password } = this.state;
    if (!Object.values(this.state).includes('')) {
      try {
        const url = `${configs.authUrl}login`;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const responseJson = await response.json();
        const { status } = response;

        if (status === 200) {
          const { dispatch } = this.props;
          const { remember } = this.state;
          const {
            token, id, name, lastName, username, storeUrl,
          } = responseJson;

          // set token to lacal storage
          if (remember) localStorage.setItem('token', token);

          dispatch(
            setUser({
              isAuthorized: true,
              id,
              name,
              lastName,
              email,
              username,
              token,
              storeUrl,
            }),
          );

          this.showAlert(
            {
              className: 'alert-success',
              text: 'Login successful!',
            },
            () => dispatch(hideOverlay()),
          );
        } else if (status === 401 || status === 400) {
          this.setState({
            password: '',
          });
          this.showAlert({
            className: 'alert-danger',
            text: 'Warning: email or password is incorrect',
          });
        }
      } catch (error) {
        this.showAlert({
          className: 'alert-danger',
          text: 'Warning: email or password is incorrect',
        });
      }
    } else {
      this.showAlert({
        className: 'alert-danger',
        text: 'Warning: all fields are required!',
      });
    }
  };

  showAlert = (alert, clb = false) => {
    this.setState({
      alert,
    });
    setTimeout(() => {
      this.setState({
        alert: false,
      });
      if (clb) clb();
    }, 1200);
  };

  render() {
    const { dispatch } = this.props;
    const { alert, remember, password } = this.state;
    return (
      <div id="LoginForm" className="row position-absolute w-100 mt-3 mx-auto">
        <div className="col pt-4 pl-5 pr-5 pb-2">
          <form
            className="mx-auto bg-light rounded pt-4 pb-4 pr-4 pl-4"
            onSubmit={this.handleSubmit}
          >
            {alert ? <Alert className={alert.className} text={alert.text} /> : ''}
            <div className="form-group row">
              <div className="col-sm-12">
                <button
                  type="button"
                  className="close"
                  aria-label="Close"
                  onClick={() => dispatch(hideOverlay())}
                >
                  <span aria-hidden="true">
&times;
                  </span>
                </button>
                <h3>
Login
                </h3>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="email" className="col-sm-3 col-lg-2 col-form-label">
                Email
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="email"
                  className={`form-control ${this.handleValidation('email')}`}
                  id="email"
                  placeholder="Email"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-lg-2 col-form-label">
                Password
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="password"
                  className={`form-control ${this.handleValidation('password')}`}
                  id="password"
                  value={password}
                  placeholder="Password"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="form-check">
                <input
                  className="form-check-input"
                  checked={remember}
                  type="checkbox"
                  id="remember"
                  onChange={this.handleInputChange}
                />
                <label className="form-check-label" htmlFor="remember">
                  Remember me
                </label>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-dark-green mt-3 green-button d-block mx-auto"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(LoginForm);
