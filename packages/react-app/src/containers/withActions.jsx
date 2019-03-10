import React from 'react';
import { ActionContext } from '../context';

function withActions(Component) {
  const C = props => (
    <ActionContext.Consumer>
      { (value) => {
          const extra = { actionContext: value };
          return (
            <Component {...props} {...extra} />
          );
        }
      }
    </ActionContext.Consumer>
  );

  C.displayName = `useActions(${Component.displayName || Component.name})`;

  return C;
}

export default withActions;
