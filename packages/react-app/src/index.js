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
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import DEFAULT_CONFIG from 'conf/default';
import getMessages from './actions/getMessages';

import './index.css';

// pages
import Home from './containers/Home';
import Login from './containers/Login';
import Messages from './containers/Messages';
import Profile from './containers/Profile';

import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { ActionContext } from './context';
import * as Actions from './actions';
import createAuth from './auth';

const config = { ...DEFAULT_CONFIG };
const history = createHistory();
const auth = createAuth(config, history);

// bind action functions, expose to components as actionContext
const actionContext = {
  ...Actions,
  getMessages: () => getMessages(auth, config),
  login: () => {
    console.log('login');
    return AuthActions.login(auth);
  },
  logout: () => AuthActions.logout(auth),
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
  <Route key="callback" path="/implicit/callback" component={ImplicitCallback} />,
  <Route key="login" path="/login" component={Login} />,
  <SecureRoute key="messages" path="/messages" component={Messages} />,
  <SecureRoute key="profile" path="/profile" component={Profile} />,
];

// Configure redux store
const store = configureStore({
  reducer: rootReducer,
  preloadedState: { config },
  middleware: [...getDefaultMiddleware()],
});

function renderApp() {
  /* global document */
  ReactDOM.render(
    <Provider store={store}>
      <ActionContext.Provider value={actionContext}>
        <App Router={SecureRouter}>
          {routes}
        </App>
      </ActionContext.Provider>
    </Provider>,
    document.getElementById('root'),
  );
}

async function start() {
  // determine current auth state
  await store.dispatch(AuthActions.updateState(auth));
  const state = store.getState();
  const { authenticated } = state.authState;
  if (authenticated) {
    console.log('authenticated, therefore requesting messages');
    store.dispatch(actionContext.getMessages());
  } else {
    console.log('NOT authenticated');
  }

  renderApp();
}

registerServiceWorker();

// Inject client script to connect to streaming resources
const script = document.createElement('script');
script.src = `${config.msgSvc.clientScriptUrl}`;
document.head.appendChild(script);

script.onload = () => {
  console.log('primus loaded');
};

/* global window */
window.auth = auth;
window.kickoff = () => {
  store.dispatch(AuthActions.updateState(auth));
};

start();
