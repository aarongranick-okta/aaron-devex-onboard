import React from 'react';
import { ConfigContext } from '../context';

const provideConfig = (Component, config) => {
  const context = { config };
  const C = props => (
    <ConfigContext.Provider value={context}>
      <Component {...props} />
    </ConfigContext.Provider>
  );

  C.displayName = `provideConfig(${Component.displayName || Component.name})`;

  return C;
};

export default provideConfig;
