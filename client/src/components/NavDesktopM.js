import React from 'react';
import UserStatus from './UserStatus';

// auth context
// import AuthContext from '../context/auth-v2/authContext.js';

export default function NavDesktopM(props) {
  //   const authContext = useContext(AuthContext);
  //   const { isAuthenticated } = authContext;

  const nav = 'desktopM';

  return <UserStatus nav={nav} />;
}
