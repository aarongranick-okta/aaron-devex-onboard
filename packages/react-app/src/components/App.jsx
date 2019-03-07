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

import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import { Container } from 'semantic-ui-react';
// import { ConfigContext } from 'app-common/context';
//import provideConfig from './containers/provideConfig';

import provideAuth from '../containers/provideAuth';
import provideUser from '../containers/provideUser';

import './App.css';
import Navbar from './Navbar';

import Home from '../containers/Home';
import CustomLoginComponent from '../pages/Login';
import Messages from '../pages/Messages';

import Profile from '../pages/Profile';

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

class App extends Component {
  render() {
    // console.log(ConfigContext);
    const { auth } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Security auth={auth}>
              <Navbar />
              <Container text style={{ marginTop: '7em' }}>
                <Route path="/" exact component={Home} />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <Route path="/login" component={CustomLoginComponent} />
                <SecureRoute path="/messages" component={Messages} />
                <SecureRoute path="/profile" component={Profile} />
              </Container>
            </Security>
          </div>
        </Router>
      </div>

    );
  }
}

// App.contextType = ConfigContext;
/* eslint-disable no-class-assign */
// App = provideUser(App);
// App = provideAuth(App, customAuthHandler);
//App = provideConfig(App);
export default App;