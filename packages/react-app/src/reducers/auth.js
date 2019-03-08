

import { SET_AUTH, SET_USERINFO } from '../constants/ActionTypes';

const INITIAL_STATE = {
  authenticated: false,
  userinfo: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH:
      return { ...state, authenticated: action.state };
    case SET_USERINFO:
      return { ...state, userinfo: action.userinfo };
    default:
      return state;
  }
};

export default authReducer;
