import updateState from './updateState';

const login = (auth) => {
  return async (dispatch) => {
    const res = await auth.login();
    return dispatch(updateState(auth));
  };
};

export default login;
