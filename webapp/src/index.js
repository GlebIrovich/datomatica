import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createSelector } from 'reselect';
import './index.css';
import { autoLoginThunk } from './redux/actions/user';
import history from './redux/store/history';
import App from './Components/App/App';
import './scss/custom.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store/configureStore';
import { fetchDataThunk } from './redux/actions/models';

const store = configureStore;

const userUpdateSubscription = createSelector(
  state => state.user,
  (user) => {
    if (user.isAuthorized) store.dispatch(fetchDataThunk('maxes', user));
  },
);

store.subscribe(() => {
  userUpdateSubscription(store.getState());
});
console.log('Getting initial state');

store.dispatch(autoLoginThunk()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );
});

registerServiceWorker();
