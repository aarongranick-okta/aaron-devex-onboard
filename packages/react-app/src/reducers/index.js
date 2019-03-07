import { combineReducers } from 'redux';
// import todos from './todos';
// import visibilityFilter from './visibilityFilter';
import config from './config';
import auth from './auth';
import user from './user';

const rootReducer = combineReducers({
  config,
  //auth,
  user,
});

export default rootReducer;
