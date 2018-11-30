import React from 'react';
import './SignUpForm.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { hideOverlay } from '../../redux/actions/overlay';
import { setUser } from '../../redux/actions/user';
import Alert from '../Alert/Alert';
import configs from '../../configs';

class SignUpForm extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      lastName: '',
      email: '',
      password: '',
      repeatPassword: '',
      alert: false,
    };
  }

  handleInputChange = (e) => {
    const newStates = {};
    newStates[e.target.id] = e.target.value;
    this.setState(newStates);
  };

  handleValidation = (id) => {
    if (id === 'pwd') {
      const { password, repeatPassword } = this.state;
      return password === repeatPassword && password !== '' ? 'is-valid' : 'is-invalid';
    }
    if (id === 'email') {
      const { email } = this.state;
      return email.match(/@/) ? 'is-valid' : 'is-invalid';
    }
    const { [id]: state } = this.state;
    return state !== '' ? 'is-valid' : 'is-invalid';
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    // validate non-empty input
    const {
      name, lastName, username, email, password,
    } = this.state;
    const { dispatch } = this.props;

    if (!Object.values(this.state).includes('')) {
      try {
        const url = `${configs.authUrl}join`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            lastName,
            username,
            email,
            password,
          }),
        });

        const responseJson = await response.json();
        const { status } = response;

        if (status === 201) {
          const { id, token } = responseJson;

          dispatch(
            setUser({
              isAuthorized: true,
              id,
              name,
              lastName,
              email,
              username,
              token,
            }),
          );

          this.showAlert(
            {
              className: 'alert-success',
              text: 'User successfuly created!',
            },
            () => dispatch(hideOverlay()),
          );
        } else if (status === 409) {
          this.showAlert({
            className: 'alert-danger',
            text: 'Warning: user with this email already exists!',
          });
        }
      } catch (error) {
        this.showAlert({
          className: 'alert-danger',
          text: 'Ooops error! I have no idea what`s happening! ',
        });
      }
    } else {
      this.showAlert({
        className: 'alert-danger',
        text: 'Warning: all fields are required!',
      });
    }
  };

  showAlert = (alert, callback = false) => {
    this.setState({
      alert,
    });
    setTimeout(() => {
      this.setState({
        alert: false,
      });
      if (callback) callback();
    }, 1200);
  };

  render() {
    const { dispatch } = this.props;
    const { alert } = this.state;
    return (
      <div id="SignUpForm" className="row position-absolute w-100 mt-3 mx-auto">
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
Sign up now!
                </h3>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="username" className="col-sm-3 col-lg-2 col-form-label">
                Username
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="text"
                  className={`form-control ${this.handleValidation('username')}`}
                  id="username"
                  placeholder="Username"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="name" className="col-sm-3 col-lg-2 col-form-label">
                Name
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="text"
                  className={`form-control ${this.handleValidation('name')}`}
                  id="name"
                  placeholder="Name"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="lastName" className="col-sm-3 col-lg-2 col-form-label">
                Last Name
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="text"
                  className={`form-control ${this.handleValidation('lastName')}`}
                  id="lastName"
                  placeholder="Last Name"
                  onChange={this.handleInputChange}
                />
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
                <small id="emailHelp" className="form-text text-muted">
                  We will never share your email with anyone else.
                </small>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="password" className="col-sm-3 col-lg-2 col-form-label">
                Password
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="password"
                  className={`form-control ${this.handleValidation('pwd')}`}
                  id="password"
                  placeholder="New Password"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="repeatPassword" className="col-sm-3 col-lg-2 col-form-label">
                Password
              </label>
              <div className="col-sm-9 col-md-6 col-lg-6">
                <input
                  type="password"
                  className={`form-control ${this.handleValidation('pwd')}`}
                  id="repeatPassword"
                  placeholder="New Password"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-dark-green mt-3 green-button d-block mx-auto"
                >
                  Join Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, overlay }) => ({
  user,
  overlay,
});
export default connect(mapStateToProps)(SignUpForm);
