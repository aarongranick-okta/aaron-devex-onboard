import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Home from '../components/Home';
import withActions from './withActions';

function mapStateToProps(state) {
  const { authenticated, userinfo } = state.authState;
  return { authenticated, userinfo };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { login } = ownProps.actionContext;
  return bindActionCreators({ login }, dispatch);
}

export default withActions(connect(mapStateToProps, mapDispatchToProps)(Home));
