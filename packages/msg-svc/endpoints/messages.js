module.exports = function messagesEndpoint(req, res) {
  const { state } = req;
  res.json({
    messages: state.messages,
  });
};
