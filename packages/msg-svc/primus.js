const Primus = require('primus');

module.exports = function createPrimus(config, server) {
  const primus = new Primus(server, {
    transformer: 'websockets',
  });
  return primus;
};
