

module.exports = function createPresenceMiddleware(state) {
  state.onlineUsers = {};
  
  return function stateMiddlware(req, res, next) {
    req.state = state;
    next();
  };
};
