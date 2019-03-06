const Message = require('core-common/message');

module.exports = function postEndpoint(req, res) {
  console.log('POST: ', req.body);
  const { state } = req;
  const { uid } = req.jwt.claims;

  const msg = new Message(req.body.msg);
  msg.from = uid;

  state.allMessages.push(msg);

  state.sentMessages[uid] = state.sentMessages[uid] || [];
  state.sentMessages[uid].push(msg);

  // TODO: received messages

  res.json({});
};
