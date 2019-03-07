import { connect } from 'react-redux';
import Navbar from '../components/Navbar';
import { login } from '../actions';

export default connect(null, { login })(Navbar);
