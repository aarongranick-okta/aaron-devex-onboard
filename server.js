const PORT = process.env.PORT || 8000;
const express = require('express');
const OktaJwtVerifier = require('@okta/jwt-verifier');
var cors = require('cors');

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: 'https://dev-132625.okta.com/oauth2/default',
  clientId: '0oabhce9bPPSkUHkl356',
  assertClaims: {
    aud: 'api://default',
  },
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req, res, next) {
    console.log('----');
  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
      console.log('NO MATCH');
    return res.status(401).end();
  }

  const accessToken = match[1];
console.log(`accessToken: ${accessToken}`);
  return oktaJwtVerifier.verifyAccessToken(accessToken)
    .then((jwt) => {
        console.log('JWT', jwt);
      req.jwt = jwt;
      next();
    })
    .catch((err) => {
        console.log('caught errorr', err);
      res.status(401).send(err.message);
    });
}

const app = express();

/**
 * For local testing only!  Enables CORS for all domains
 */
app.use(cors());

/**
 * An example route that requires a valid access token for authentication, it
 * will echo the contents of the access token if the middleware successfully
 * validated the token.
 */
app.get('/secure', authenticationRequired, (req, res) => {
  res.json(req.jwt);
});

/**
 * Another example route that requires a valid access token for authentication, and
 * print some messages for the user if they are authenticated
 */
app.get('/api/messages', authenticationRequired, (req, res) => {
    console.log('here we are api messages');
  res.json({
      messages: [{
        date: Date.now(),
        text: 'Hello, word!'
      }]
  });
});

app.listen(PORT, () => {
  console.log(`Serve Ready on port ${PORT}`);
});
