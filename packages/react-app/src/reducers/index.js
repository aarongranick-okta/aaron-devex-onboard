import { combineReducers } from 'redux';
// import todos from './todos';
// import visibilityFilter from './visibilityFilter';
import config from './config';
import auth from './auth';
import user from './user';
import messages from './messages';

const rootReducer = combineReducers({
  config,
  auth,
  user,
  messages,
});

export default rootReducer;
