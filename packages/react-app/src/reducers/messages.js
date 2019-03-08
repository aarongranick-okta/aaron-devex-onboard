
import { SET_MESSAGES } from '../constants/ActionTypes';

const messagesReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return { ...state, data: action.data };
    default:
      return state;
  }
};

export default messagesReducer;
