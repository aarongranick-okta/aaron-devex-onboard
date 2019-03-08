import React from 'react';

const ConfigContext = React.createContext({});
const AuthContext = React.createContext();
const UserContext = React.createContext({
  authenticated: false,
  userinfo: null,
});
const ActionContext = React.createContext({});
export { ConfigContext, AuthContext, UserContext, ActionContext };
