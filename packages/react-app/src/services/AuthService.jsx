import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';
import { connect } from 'react-redux';
//import { initAuth, checkAuth, setAuth, setUserInfo } from '../actions';

// Must be a child of the Okta Security component (which must be a child of Router)
// Watches auth state and Pushes to redux store
class AuthService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    // const { auth, init } = this.props;
    // init(auth);
    // this.checkAuthentication();
  }

  async componentDidUpdate() {
    // this.checkAuthentication();
  }

  /**
   * Helper function that watches the authenticate state, then applies it
   * as a boolean (authenticated) as well as attaches the userinfo data.
   */
  // async checkAuthentication() {
  //   const {
  //     auth, dispatch, authenticated, userinfo,
  //   } = this.props;
  //   let res = await auth.isAuthenticated();
  //   if (res !== authenticated) {
  //     dispatch(setAuth(res));
  //   }

  //   res = await auth.getUser();
  //   if (res !== userinfo) {
  //     dispatch(setUserInfo(res));
  //   }
  // }

  render() {
    return <div />;
  }
}

function mapState(state) {
  const { authenticated, userinfo } = state;
  return { authenticated, userinfo };
}

export default AuthService; // withAuth(connect(mapState, { init: initAuth })(AuthService));
