import * as types from '../constants/ActionTypes';

export const login = (auth) => {
  return async (dispatch) => {
    const res = await auth.login();

    const authenticated = await auth.isAuthenticated();
    const accessToken = await auth.getAccessToken();
    const userinfo = await auth.getUser();

    dispatch({
      type: types.LOGIN,
      authenticated,
      accessToken,
      userinfo,
    });

  //   if (authenticated !== this.state.authenticated) {
  //     if (authenticated) {
  //       const accessToken = await auth.getAccessToken();
  //       const userinfo = await auth.getUser();
  //       const userContext = {
  //         auth, authenticated, userinfo, accessToken,
  //       };
  //       this.setState({ authenticated, userContext });
  //     } else {
  //       this.setState({ authenticated, userContext: DEFAULT_CONTEXT });
  //     }
  // };
  };
};

export const addTodo = text => ({ type: types.ADD_TODO, text });
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter });
