

import { AUTH_STATE, SET_AUTH, SET_USERINFO } from '../constants/ActionTypes';

const INITIAL_STATE = {
  authenticated: false,
  userinfo: null,
};

function applyAuthState(state, action) {
  const { authenticated, userinfo } = action;
  return { ...state, authenticated, userinfo };
}

const authStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_STATE:
      return applyAuthState(state, action);
    case SET_AUTH:
      return { ...state, authenticated: action.state };
    case SET_USERINFO:
      return { ...state, userinfo: action.userinfo };
    default:
      return state;
  }
};

export default authStateReducer;
