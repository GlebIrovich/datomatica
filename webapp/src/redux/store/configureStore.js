import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';

import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import userReducer from '../reducers/userReducer';
import overlayReducer from '../reducers/overlayReducer';

import history from './history';
import sidebarReducer from '../reducers/sidebarReducer';
import modelReducer from '../reducers/modelReducer';

/* eslint-disable no-underscore-dangle */
const rootReducer = combineReducers({
  user: userReducer,
  overlay: overlayReducer,
  sidebar: sidebarReducer,
  models: modelReducer,
});

let store;

if (process.env.NODE_ENV === 'production') {
  store = () => {
    const newStore = createStore(
      connectRouter(history)(rootReducer),
      compose(
        applyMiddleware(thunk, routerMiddleware(history)),
      ),
    );

    return newStore;
  };
} else {
  store = () => {
    const newStore = createStore(
      connectRouter(history)(rootReducer),
      compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    );

    return newStore;
  };
}


export default store();
/* eslint-enable */
