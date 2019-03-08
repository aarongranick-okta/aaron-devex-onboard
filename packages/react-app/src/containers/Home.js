import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import Home from '../components/Home';
import { login } from '../actions';

function mapStateToProps(state) {
  const { auth } = state;
  const { authenticated, userinfo } = auth;
  return { authenticated, userinfo };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: () => dispatch(login(ownProps.auth)),
  };
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));
