import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { login, logout } from '../actions';

const mapState = (state) => {
  const { auth } = state;
  const { authenticated, userinfo } = auth;
  return { authenticated, userinfo };
};

export default connect(mapState, { login, logout })(Navbar);
