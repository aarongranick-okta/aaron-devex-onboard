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
  };
};

export const logout = auth => async (dispatch) => {
  const res = await auth.logout();
  const authenticated = await auth.isAuthenticated();
  const accessToken = await auth.getAccessToken();
  const userinfo = await auth.getUser();

  dispatch({
    type: types.LOGOUT,
    authenticated,
    accessToken,
    userinfo,
  });
};

export const getMessages = (auth, config) => async (dispatch) => {
  try {
    const accessToken = await auth.getAccessToken();
    /* global fetch */
    const response = await fetch(config.msgSvc.messagesUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status !== 200) {
      this.setState({ failed: true });
      return;
    }

    // let index = 0;
    const data = await response.json();
    const { allMessages, sentMessages } = data;
    // const messages = data.messages.map((message) => {
    //   const date = new Date(message.date);
    //   const day = date.toLocaleDateString();
    //   const time = date.toLocaleTimeString();
    //   index += 1;
    //   return {
    //     date: `${day} ${time}`,
    //     text: message.text,
    //     id: `message-${index}`,
    //   };
    // });
    this.setState({ allMessages, sentMessages, failed: false });
  } catch (err) {
    this.setState({ failed: true });
    /* eslint-disable no-console */
    console.error(err);
  }
};

export const setMessages = data => ({ type: types.SET_MESSAGES, data });
export const setAuth = state => ({ type: types.SET_AUTH, state });
export const setUserInfo = userinfo => ({ type: types.SET_USERINFO, userinfo });
export const addTodo = text => ({ type: types.ADD_TODO, text });
export const deleteTodo = id => ({ type: types.DELETE_TODO, id });
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text });
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id });
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS });
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED });
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter });
