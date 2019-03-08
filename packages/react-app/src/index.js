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

// import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from 'redux-starter-kit';

import App from './containers/App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';
import { ActionContext } from './context';
import * as Actions from './actions';

const config = require('conf/default');

const store = configureStore({
  reducer: rootReducer,
  preloadedState: { config },
});

const actionContext = {};
Object.keys(Actions).forEach(key => {
  console.log(key);
});

/* global document */

// Inject client script to connect to streaming resources
const script = document.createElement('script');
script.src = `${config.msgSvc.clientScriptUrl}`;
document.head.appendChild(script);

script.onload = () => {
  /* eslint-disable react/jsx-filename-extension */
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

registerServiceWorker();

