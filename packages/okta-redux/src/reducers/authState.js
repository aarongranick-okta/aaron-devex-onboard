

import { AUTH_STATE, AUTH_ERROR, SET_AUTH, SET_USERINFO } from '../constants/ActionTypes';

const INITIAL_STATE = {
  authenticated: false,
  userinfo: null,
};

function applyAuthState(state, action) {
  const { authenticated, userinfo, error } = action;
  return {
    ...state,
    authenticated,
    userinfo,
    error,
  };
}

const authStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_STATE:
      return applyAuthState(state, action);
    case AUTH_ERROR:
      return { ...state, error: action.error };
    case SET_AUTH:
      return { ...state, authenticated: action.state };
    case SET_USERINFO:
      return { ...state, userinfo: action.userinfo };
    default:
      return state;
  }
};

export default authStateReducer;
