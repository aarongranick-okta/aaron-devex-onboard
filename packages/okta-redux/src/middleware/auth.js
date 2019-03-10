import { LOGIN } from '../constants/ActionTypes';
import login from '../actions/login';

export default auth => store => next => (action) => {
  switch (action.type) {
    case LOGIN:
      return login(auth);
    default:
      return next(action);
  }
};
