import updateState from './updateState';

const login = auth => async (dispatch) => {
  await auth.login();
  return dispatch(updateState(auth));
};

export default login;
