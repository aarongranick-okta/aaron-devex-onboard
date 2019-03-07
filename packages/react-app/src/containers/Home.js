import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withAuth } from '@okta/okta-react';
import Home from '../pages/Home';
import { login } from '../actions';

function mapStateToProps(state) {
  const { auth } = state;
  return { auth };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: () => dispatch(login(ownProps.auth)),
  };
}

export default withAuth(connect(mapStateToProps, mapDispatchToProps)(Home));
