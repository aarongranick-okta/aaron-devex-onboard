import { Auth } from '@okta/okta-react';

function customAuthHandler({ history }) {
  // Redirect to the /login page that has a CustomLoginComponent
  history.push('/login');
}

export default function createAuth(config, history) {
  const securityProps = {
    history,
    issuer: config.common.issuer,
    client_id: config.msgApp.clientId,
    redirect_uri: config.msgApp.redirectUri,
    onAuthRequired: customAuthHandler,
  };

  const auth = new Auth(securityProps);
  return auth;
}
