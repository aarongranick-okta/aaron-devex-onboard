import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Auth } from '@okta/okta-react';
import { ConfigContext, AuthContext } from '../context';

// function customAuthHandler({ history }) {
//   // Redirect to the /login page that has a CustomLoginComponent
//   history.push('/login');
// }

const provideAuth = (WrappedComponent, customAuthHandler) => {
  class C extends Component {
    // constructor(props) {
    //   super(props);
    // }

    getChildContext() {
      return {
        auth: this.auth,
      };
    }
  
    componentWillMount() {
      const { config } = this.context;
      this.auth = new Auth({
        issuer: config.common.issuer,
        client_id: config.msgApp.clientId,
        redirect_uri: config.msgApp.redirectUri,
        onAuthRequired: customAuthHandler,
      });
      this.authContext = { auth: this.auth };
    }

    render() {
      const { props, authContext } = this;
      return (
        <AuthContext.Provider value={authContext}>
          <WrappedComponent {...props} />
        </AuthContext.Provider>
      );
    }
  }
  C.childContextTypes = {
    auth: PropTypes.object.isRequired,
  };
  C.contextType = ConfigContext;
  C.displayName = `provideAuth(${Component.displayName || Component.name})`;

  return C;
};

export default provideAuth;
