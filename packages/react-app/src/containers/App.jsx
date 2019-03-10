import React from 'react';
import { connect } from 'react-redux';


import App from '../components/App';

// // services
// import SocketService from '../services/SocketService';
// import AuthService from '../services/AuthService';

// // pages
// import Home from '../containers/Home';
// import Login from '../containers/Login';
// import Messages from '../components/Messages';
// import Profile from '../components/Profile';

// function mapStateToProps(state, ownProps) {
//   const { config } = state;
//   const { auth, history } = ownProps;

//   const services = [
//     <SocketService key="socket" url={config.msgSvc.baseUrl} />,
//     <AuthService key="auth" />,
//   ];

//   const router = props => (
//     <Router history={history}>
//       <div>
//         <Security auth={auth}>
//           {services}
//           {props.children}
//         </Security>
//       </div>
//     </Router>
//   );

//   const children = [
//     <Route key="home" path="/" exact component={Home} />,
//     <Route key="callback" path="/implicit/callback" component={ImplicitCallback} />,
//     <Route key="login" path="/login" component={Login} />,
//     <SecureRoute key="messages" path="/messages" component={Messages} />,
//     <SecureRoute key="profile" path="/profile" component={Profile} />,
//   ];

//   return {
//     Router: router, children,
//   };
// }

export default App; // connect(mapStateToProps)(App);
