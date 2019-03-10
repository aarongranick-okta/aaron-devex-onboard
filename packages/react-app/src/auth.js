import { Auth } from '@okta/okta-react';

export default function createAuth(config, history, onAuthRequired) {
  const securityProps = {
    history,
    issuer: config.common.issuer,
    client_id: config.msgApp.clientId,
    redirect_uri: config.msgApp.redirectUri,
    onAuthRequired,
  };

  const auth = new Auth(securityProps);
  return auth;
}
