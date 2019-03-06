import React from 'react';
import { ConfigContext } from 'app-common/context';

const provideConfig = (Component) => {
  const C = props => (
    <ConfigContext.Provider value={props.config}>
      <Component {...props} />
    </ConfigContext.Provider>
  );

  C.displayName = `provideConfig(${Component.displayName || Component.name})`;

  return C;
};

export default provideConfig;
