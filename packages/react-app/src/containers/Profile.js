import { connect } from 'react-redux';
import Profile from '../components/Profile';
import withActions from './withActions';

const mapState = (state) => {
  // const { auth } = state;
  const { authenticated, userinfo } = state.authState;
  return { authenticated, userinfo };
};

const mapDispatch = (state, props) => {
  const { login, logout } = props.actionContext;
  return { login, logout };
};

export default withActions(connect(mapState, mapDispatch)(Profile));
