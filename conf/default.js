// Used by Node JS, must be ES5 with node v9

const SECRETS = require('../.secrets.json');

module.exports = {
  oidc: {
    clientId: `${SECRETS.clientId}`,
    issuer: `https://${SECRETS.oktaDomain}.okta.com/oauth2/default`,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
    port: 8000,
    assertClaims: {
      aud: 'api://default',
      cid: `${SECRETS.clientId}`,
    }
  }
};
