import { connect } from 'react-redux';
import Login from '../components/Login';

function mapStateToProps(state) {
  const { config } = state;
  return { config };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    // login: () => dispatch(login(ownProps.auth)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
