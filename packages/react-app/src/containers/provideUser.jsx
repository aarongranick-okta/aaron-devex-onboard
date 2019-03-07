import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { UserContext, AuthContext } from '../context';

const DEFAULT_CONTEXT = { authenticated: false };

const provideUser = (WrappedComponent) => {
  class C extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null, userContext: DEFAULT_CONTEXT };
    }
    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    async checkAuthentication() {
      const { auth } = this.context;
      const authenticated = await auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        if (authenticated) {
          const accessToken = await auth.getAccessToken();
          const userinfo = await auth.getUser();
          const userContext = {
            auth, authenticated, userinfo, accessToken,
          };
          this.setState({ authenticated, userContext });
        } else {
          this.setState({ authenticated, userContext: DEFAULT_CONTEXT });
        }
      }
    }

    render() {
      const { props, state } = this;
      return (
        <UserContext.Provider value={state.userContext}>
          <WrappedComponent {...props} />
        </UserContext.Provider>
      );
    }
  }
  C.contextType = AuthContext;
  C.displayName = `provideUser(${Component.displayName || Component.name})`;

  return withAuth(C);
};

export default provideUser;
