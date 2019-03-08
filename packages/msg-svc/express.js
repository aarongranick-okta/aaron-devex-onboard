const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const mwState = require('./middleware/state');
const mwAuth = require('./middleware/auth');
const epMessages = require('./endpoints/messages');
const epPost = require('./endpoints/post');

module.exports = function createExpressApp(config) {
  const state = {
    allMessages: [],
    sentMessages: {},
    receivedMessages: {},
  };

  const serverState = mwState(state);
  const authenticationRequired = mwAuth(config);


  const app = express();

  /**
   * For local testing only!  Enables CORS for all domains
   */
  app.use(cors());

  app.use(serverState);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello!  There\'s not much to see here :) Please grab one of our front-end samples for use with this sample resource server',
    });
  });

  /**
   * An example route that requires a valid access token for authentication, it
   * will echo the contents of the access token if the middleware successfully
   * validated the token.
   */
  app.get('/api/secure', authenticationRequired, (req, res) => {
    res.json(req.jwt);
  });

  /**
   * Another example route that requires a valid access token for authentication, and
   * print some messages for the user if they are authenticated
   */
  app.get('/api/messages', authenticationRequired, epMessages);


  // POST interface
  app.use(bodyParser.json());
  app.post('/api/post', authenticationRequired, epPost);

  return app;
};
