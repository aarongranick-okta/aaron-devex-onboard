import React from 'react';
import { UserContext } from '../context';

function withUser(Component) {
  const C = props => (
    <UserContext.Consumer>
      { userContext => <Component {...props} {...userContext} /> }
    </UserContext.Consumer>
  );

  C.displayName = `withUser(${Component.displayName || Component.name})`;

  return C;
}

export default withUser;
