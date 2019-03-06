module.exports = function messagesEndpoint(req, res) {
  const { state } = req;
  const { uid } = req.jwt.claims;

  res.json({
    allMessages: state.allMessages || [],
    sentMessages: state.sentMessages[uid] || [],
    receivedMessages: state.receivedMessages[uid] || [],
  });
};
