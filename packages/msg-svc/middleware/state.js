

module.exports = function createStateMiddleware(state) {
  return function stateMiddlware(req, res, next) {
    req.state = state;
    next();
  };
};
