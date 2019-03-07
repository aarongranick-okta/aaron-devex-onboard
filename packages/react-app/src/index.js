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

import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Auth } from '@okta/okta-react';

// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit'

import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import provideConfig from './containers/provideConfig';
// import provideAuth from './containers/provideAuth';
// import provideUser from './containers/provideUser';

// import App from './components/App'
import rootReducer from './reducers';

const config = require('conf/default');

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

const auth = new Auth({
  issuer: config.common.issuer,
  client_id: config.msgApp.clientId,
  redirect_uri: config.msgApp.redirectUri,
  onAuthRequired: customAuthHandler,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { config },
});

// WrappedApp = provideUser(App);
// WrappedApp = provideAuth(App, auth);
// const WrappedApp = provideConfig(App, CONFIG);

/* global document */
/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={store}>
    <App auth={auth} />
  </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
