import { connect } from 'react-redux';

import Messages from '../components/Messages';
import withActions from './withActions';

function mapStateToProps(state, ownProps) {
  const { allMessages, sentMessages, failed } = state.messages;
  return { allMessages, sentMessages, failed };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {

  };
}

export default withActions(connect(mapStateToProps, mapDispatchToProps)(Messages));
