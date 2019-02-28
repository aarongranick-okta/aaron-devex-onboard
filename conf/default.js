import SECRETS from '../.okta-secrets.json';

export default {
  oidc: {
    clientId: `${SECRETS.clientId}`,
    issuer: `https://${SECRETS.oktaDomain}.com/oauth2/default`,
    redirectUri: 'http://localhost:8080/implicit/callback',
    scope: 'openid profile email',
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
    port: 8000,
    oidc: {
      issuer: `https://${SECRETS.oktaDomain}.com/oauth2/default`
    },
    assertClaims: {
      aud: 'api://default',
      cid: `${SECRETS.clientId}`,
    }
  }
};
