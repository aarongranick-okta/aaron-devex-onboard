let STATIC_ID = 1;

function Message(msg) {
  this.date = new Date();
  this.text = msg;
  this.id = STATIC_ID;
  STATIC_ID += 1;
}

module.exports = Message;
