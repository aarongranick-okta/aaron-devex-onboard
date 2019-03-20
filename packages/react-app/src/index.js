/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import 'semantic-ui-css/semantic.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit';
import { Actions as AuthActions } from 'okta-redux';
import createHistory from 'history/createBrowserHistory';
import { Router, Route } from 'react-router-dom';
import { Security, SecureRoute } from '@okta/okta-react';

import DEFAULT_CONFIG from 'conf/default';
import getMessages from './actions/getMessages';

import './index.css';

// pages
import Home from './containers/Home';
import Login from './containers/Login';
import AuthCallback from './containers/AuthCallback';
import Messages from './containers/Messages';
import Profile from './containers/Profile';

import App from './containers/App';
import SocketService from './services/SocketService';

import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { ActionContext } from './context';
import * as Actions from './actions';
import createAuth from './auth';

const debug = require('debug')('okta:react-app:index');
const assert = require('assert');

const config = { ...DEFAULT_CONFIG };

// Configure redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: { config },
  middleware: [...getDefaultMiddleware()],
});

const history = createHistory();

// Auth flow
function onAuthRequired({ history: authHistory }) {
  assert(authHistory === history, 'Auth should be using our history object!');

  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

const auth = createAuth(config, history, onAuthRequired);

function onAuthSuccess() {
  debug('AUTH success. performing redirect to previous page.');


  /* global localStorage */
  // https://github.com/okta/okta-oidc-js/blob/2ae1effe948c35d112f58f12fbf3b4730e3a24e4/packages/okta-react/src/Auth.js#L110
  const referrerKey = 'secureRouterReferrerPath';
  const location = JSON.parse(localStorage.getItem(referrerKey) || '{ "pathname": "/" }');
  localStorage.removeItem(referrerKey);

  history.push(location.pathname);

  store.dispatch(getMessages(auth, config));
}

function onAuthError(e) {
  debug('AUTH error', e);
}

// bind action functions, expose to components as actionContext
const actionContext = {
  ...Actions,
  getMessages: () => getMessages(auth, config),
  login: () => {
    debug('login');
    return AuthActions.login(auth);
  },
  logout: () => AuthActions.logout(auth),
  handleAuthCallback: () => AuthActions.handleAuthCallback(auth, onAuthSuccess, onAuthError),
};

/* eslint-disable react/jsx-filename-extension */
const SecureRouter = props => (
  <Router history={history}>
    <div>
      <Security auth={auth}>
        {props.children}
      </Security>
    </div>
  </Router>
);

const routes = [
  <Route key="home" path="/" exact component={Home} />,
  <Route key="login" path="/login" component={Login} />,
  <Route key="callback" path="/implicit/callback" component={AuthCallback} />,
  <SecureRoute key="messages" path="/messages" component={Messages} />,
  <SecureRoute key="profile" path="/profile" component={Profile} />,
];

function renderApp() {
  /* global document */
  ReactDOM.render(
    <Provider store={store}>
      <ActionContext.Provider value={actionContext}>
        <SocketService url={config.msgSvc.baseUrl} />
        <App Router={SecureRouter}>
          {routes}
        </App>
      </ActionContext.Provider>
    </Provider>,
    document.getElementById('root'),
  );
}

async function start() {

  renderApp();
  
  // determine current auth state
  await store.dispatch(AuthActions.updateState(auth));
  const state = store.getState();
  const { authenticated } = state.authState;
  if (authenticated) {
    debug('authenticated, therefore requesting messages');
    store.dispatch(actionContext.getMessages());
  } else {
    debug('NOT authenticated');
  }

  //renderApp();
}

registerServiceWorker();

// Inject client script to connect to streaming resources
const script = document.createElement('script');
script.src = `${config.msgSvc.clientScriptUrl}`;
document.head.appendChild(script);

script.onload = () => {
  debug('primus loaded');
};

/* global window */
window.auth = auth;
window.updateAuthState = () => {
  store.dispatch(AuthActions.updateState(auth));
};

start();
