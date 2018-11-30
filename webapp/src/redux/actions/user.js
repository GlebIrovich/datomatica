import configs from '../../configs';

// set user

export const setUser = user => ({
  type: 'SET_USER',
  user,
});

export const resetUser = () => ({
  type: 'RESET_USER',
});

export const resetStoreUrl = () => ({
  type: 'RESET_STORE_URL',
});

const autoLogin = async () => {
  console.log('Trying to fetch user');

  const token = localStorage.getItem('token');
  if (!token) return {};
  try {
    const url = `${configs.authUrl}auto-login`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Baerer ${token}`,
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      const {
        id, username, name, lastName, email, storeUrl,
      } = responseJson;
      console.log('Store url', storeUrl);
      
      return {
        isAuthorized: true,
        id,
        username,
        name,
        lastName,
        email,
        token,
        storeUrl,
      };
    }
    return {};
  } catch (err) {
    console.log('User was not authorized');
    return {};
  }
};

export const autoLoginThunk = () => dispatch => autoLogin()
  .then(user => dispatch(setUser(user)))
  .then(() => {
    console.log('User updated');
  });
