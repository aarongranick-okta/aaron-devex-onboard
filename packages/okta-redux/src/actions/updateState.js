import { AUTH_STATE } from '../constants/ActionTypes';

const updateState = auth => async (dispatch) => {
  const authenticated = await auth.isAuthenticated();
  const accessToken = await auth.getAccessToken();
  const userinfo = await auth.getUser();
  return dispatch({
    type: AUTH_STATE,
    authenticated,
    accessToken,
    userinfo,
  });
};

export default updateState;
