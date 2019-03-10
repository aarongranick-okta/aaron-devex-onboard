import updateState from './updateState';
import { AUTH_ERROR } from '../constants/ActionTypes';

const handleAuthCallback = (auth, onAuthSuccess, onAuthError) => async (dispatch) => {
  //
  return auth.handleAuthentication()
    .then(() => {
      // success
      if (onAuthSuccess) {
        onAuthSuccess();
      }
      return dispatch(updateState(auth));
    })
    .catch((e) => {
      // fail
      if (onAuthError) {
        onAuthError(e);
      }
      const errString = e.toString();
      return dispatch({
        type: AUTH_ERROR,
        error: errString,
      });
    });
};

export default handleAuthCallback;
