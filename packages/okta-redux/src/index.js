import * as ActionTypes from './constants/ActionTypes';
import login from './actions/login';
import logout from './actions/logout';
import updateState from './actions/updateState';
import auth from './middleware/auth';
import authState from './reducers/authState';

const Actions = {
  login,
  logout,
  updateState,
};

const Middleware = {
  auth,
};

const Reducers = {
  authState,
};

export { ActionTypes, Actions, Middleware, Reducers };
