import { connect } from 'react-redux';
import App from '../components/App';

function mapStateToProps(state) {
  // const { auth } = state;
  // return { auth };
  return state;
}

export default connect(mapStateToProps)(App);
