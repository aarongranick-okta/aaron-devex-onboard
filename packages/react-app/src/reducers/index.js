import { combineReducers } from 'redux';
import { Reducers as AuthReducers } from 'okta-redux';

// import todos from './todos';
// import visibilityFilter from './visibilityFilter';
import config from './config';
import user from './user';
import messages from './messages';

const { authState } = AuthReducers;
const rootReducer = combineReducers({
  config,
  authState,
  user,
  messages,
});

export default rootReducer;
