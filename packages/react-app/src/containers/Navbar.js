import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import withActions from './withActions';

const mapState = (state) => {
  // const { auth } = state;
  const { authenticated, userinfo } = state.authState;
  return { authenticated, userinfo };
};

const mapDispatch = (state, props) => {
  const { login, logout } = props.actionCreators;
  return { login, logout };
};

export default withActions(connect(mapState, mapDispatch)(Navbar));
