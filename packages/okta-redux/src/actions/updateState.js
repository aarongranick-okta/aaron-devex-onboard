import { AUTH_STATE } from '../constants/ActionTypes';

const updateState = (auth) => {
  return async (dispatch) => {
    const authenticated = false; // await auth.isAuthenticated();
    const accessToken = null; // await auth.getAccessToken();
    const userinfo = null; // await auth.getUser();
    dispatch({
      type: AUTH_STATE,
      authenticated,
      accessToken,
      userinfo,
    });
  };
};

export default updateState;
