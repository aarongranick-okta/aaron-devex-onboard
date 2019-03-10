import updateState from './updateState';

const logout = auth => async (dispatch) => {
  const res = await auth.logout();
  return dispatch(updateState(auth));
};


export default logout;
