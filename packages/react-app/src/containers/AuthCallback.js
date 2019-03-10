import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AuthCallback from '../components/AuthCallback';
import withActions from './withActions';

function mapStateToProps(state) {
  const { authenticated, error } = state.authState;
  return { authenticated, error };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { handleAuthCallback } = ownProps.actionContext;
  return bindActionCreators({ handleAuthCallback }, dispatch);
}

export default withActions(connect(mapStateToProps, mapDispatchToProps)(AuthCallback));
