/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */

const OktaJwtVerifier = require('@okta/jwt-verifier');

module.exports = function createAuthMiddleware(CONFIG) {
  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: CONFIG.common.issuer,
    assertClaims: CONFIG.msgSvc.assertClaims,
  });

  return function authenticationRequired(req, res, next) {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/Bearer (.+)/);

    if (!match) {
      res.status(401);
      return next('Unauthorized');
    }

    const accessToken = match[1];

    return oktaJwtVerifier.verifyAccessToken(accessToken)
      .then((jwt) => {
        req.jwt = jwt;
        console.log('CLAIMS: ', jwt.claims);
        const clientId = jwt.claims.cid;
        if (clientId === CONFIG.msgApp.clientId) {
          console.log('Serving messages to MSG app');
          return next();
        }

        if (clientId === CONFIG.adminApp.clientId) {
          console.log('Serving messages to ADMIN app');
          return next();
        }

        console.log('UNKNOWN APPLICATION!!', clientId);
        res.status(401);
        return next('Unauthorized');
      })
      .catch((err) => {
        res.status(401).send(err.message);
      });
  };
};
