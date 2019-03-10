import updateState from './updateState';

const logout = auth => async (dispatch) => {
  await auth.logout();
  return dispatch(updateState(auth));
};

export default logout;
