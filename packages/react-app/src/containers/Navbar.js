import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Navbar from '../components/Navbar';
import withActions from './withActions';

const mapState = (state) => {
  // const { auth } = state;
  const { authenticated, userinfo } = state.authState;
  return { authenticated, userinfo };
};

const mapDispatch = (dispatch, props) => {
  const { login, logout } = props.actionContext;
  return bindActionCreators({ login, logout }, dispatch);
};

export default withActions(connect(mapState, mapDispatch)(Navbar));
