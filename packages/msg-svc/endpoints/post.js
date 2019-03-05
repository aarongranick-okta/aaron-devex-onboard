module.exports = function postEndpoint(req, res) {
  console.log('POST: ', req.body);
  const { state } = req;
  state.messages.push({
    date: new Date(),
    text: req.body.msg,
  });
  res.json({});
};
