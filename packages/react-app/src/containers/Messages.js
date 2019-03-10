import { connect } from 'react-redux';
import { withAuth } from '@okta/okta-react';
import Messages from '../components/Messages';
import { login } from '../actions';

function mapStateToProps(state, ownProps) {
  const { auth, config } = state;
  const { authenticated, userinfo } = auth;
  return { config, authenticated, userinfo };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: () => dispatch(login(ownProps.auth)),
  };
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Messages));
