import React from 'react';
import { ConfigContext } from 'app-common/context';

function withConfig(Component) {
  const C = props => (
    <ConfigContext.Consumer>
      { (value) => {
          const extra = { config: value };
          return (
            <Component {...props} {...extra} />
          );
        }
      }
    </ConfigContext.Consumer>
  );

  C.displayName = `provideConfig(${Component.displayName || Component.name})`;

  return C;
}

export default withConfig;
