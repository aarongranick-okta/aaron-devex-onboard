import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import App from '../components/App';

// services
import SocketService from '../services/SocketService';
import AuthService from '../services/AuthService';

// pages
import Home from '../containers/Home';
import Login from '../containers/Login';
import Messages from '../components/Messages';
import Profile from '../components/Profile';

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

function mapStateToProps(state) {
  const { config } = state;

  const securityProps = {
    issuer: config.common.issuer,
    client_id: config.msgApp.clientId,
    redirect_uri: config.msgApp.redirectUri,
    onAuthRequired: customAuthHandler,
  };

  const Router = props => (
    <BrowserRouter>
      <div>
        <Security {...securityProps}>
          {props.children}
        </Security>
      </div>
    </BrowserRouter>
  );

  const pages = [
    <Route key="home" path="/" exact component={Home} />,
    <Route key="callback" path="/implicit/callback" component={ImplicitCallback} />,
    <Route key="login" path="/login" component={Login} />,
    <SecureRoute key="messages" path="/messages" component={Messages} />,
    <SecureRoute key="profile" path="/profile" component={Profile} />,
  ];

  const services = [
    <SocketService key="socket" url={config.msgSvc.baseUrl} />,
    <AuthService key="auth" />,
  ];

  return {
    Router, pages, services, config,
  };
}

export default connect(mapStateToProps)(App);
