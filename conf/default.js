// Used by Node JS, must be ES5 with node v9

const SECRETS = require('./.secrets.json');

const ISSUER = `https://${SECRETS.oktaDomain}/oauth2/default`;

const PORTS = {
  MSG_APP: process.env.PORT || 8080,
  MSG_SVC: process.env.PORT || 8000,
  ADMIN_APP: process.env.PORT || 8081,
};

const BASE_URLS = {
  MSG_SVC: `http://localhost:${PORTS.MSG_SVC}`,
};

module.exports = {
  common: {
    issuer: ISSUER,
  },
  adminApp: {
    clientId: `${SECRETS.adminClientId}`,
    redirectUri: `http://localhost:${PORTS.ADMIN_APP}/implicit/callback`,
    scope: 'openid profile email',
  },
  msgApp: {
    clientId: `${SECRETS.clientId}`,
    redirectUri: `http://localhost:${PORTS.MSG_APP}/implicit/callback`,
    scope: 'openid profile email',
  },
  msgSvc: {
    baseUrl: `${BASE_URLS.MSG_SVC}`,
    clientScriptUrl: `${BASE_URLS.MSG_SVC}/primus/primus.js`,
    messagesUrl: `${BASE_URLS.MSG_SVC}/api/messages`,
    postUrl: `${BASE_URLS.MSG_SVC}/api/post`,
    port: PORTS.MSG_SVC,
    assertClaims: {
      aud: 'api://default',
      // cid: `${SECRETS.clientId}`,
    },
  },
};
