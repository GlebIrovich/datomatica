import configs from '../../configs';

// set data

export const setData = (model, data) => ({
  type: 'SET_DATA',
  data,
  model,
});

const fetchData = async (model, { user: { id, token } }) => {
  // (model_name, user object)

  try {
    const url = `${configs.authUrl}models/${model}`;
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ user_id: id }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Baerer ${token}`,
      },
    });
    const responseJson = await response.json();
    if (response.status === 200) {
      const { data } = responseJson;
      return {
        data,
      };
    }
    return {};
  } catch (err) {
    console.log('User was not authorized');
    return {};
  }
};

export const fetchDataThunk = model => (dispatch, getState) => fetchData(model, getState())
  .then(data => dispatch(setData(model, data)))
  .then(() => {
    console.log('Data fetched');
  });
