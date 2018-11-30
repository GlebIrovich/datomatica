import React from 'react';
import { connect } from 'react-redux';
import configs from '../../configs';
import Form from './Form';
import ActiveStore from './ActiveStore';
import { resetStoreUrl } from '../../redux/actions/user';

class OAuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { url: '' };
  }

  handleInput = (e) => {
    this.setState({
      url: e.target.value,
    });
  };

  handleReset = async () => {
    const {
      dispatch,
      user: { id },
    } = this.props;
    const token = localStorage.getItem('token');

    const response = await fetch(`${configs.authUrl}tokens`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Baerer ${token}`,
      },
      body: JSON.stringify({ user_id: id }),
    });

    if (response.status === 200) {
      console.log('Store url reset');
      dispatch(resetStoreUrl());
    }
  };

  handleValidation = () => {
    const { url } = this.state;
    return url !== '' ? 'is-valid' : 'is-invalid';
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { url } = this.state;
    if (!url) return;
    const {
      user: { id },
    } = this.props;
    const endpoint = '/wc-auth/v1/authorize';

    const params = {
      app_name: 'Datomatica',
      scope: 'read',
      user_id: id,
      return_url: configs.returnUrl,
      callback_url: `${configs.authUrl}tokens`,
    };

    const token = localStorage.getItem('token');

    const r = await fetch(params.callback_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Baerer ${token}`,
      },
      body: JSON.stringify({ user_id: id, url }),
    });
    if (r.status === 200 || r.status === 201) {
      console.log('redirecting...');

      window.location = `${url}${endpoint}?app_name=${params.app_name}&scope=${
        params.scope
      }&user_id=${params.user_id}&return_url=${params.return_url}&callback_url=${
        params.callback_url
      }`;
    }

    // window.location.replace
  };

  render() {
    const { url } = this.state;
    const {
      user: { storeUrl },
    } = this.props;

    if (storeUrl) {
      return <ActiveStore storeUrl={storeUrl} handleReset={this.handleReset} />;
    }
    return (
      <Form
        url={url}
        handleInput={this.handleInput}
        handleSubmit={this.handleSubmit}
        handleValidation={this.handleValidation}
      />
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(OAuthForm);
