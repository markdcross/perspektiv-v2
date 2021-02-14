import React from 'react';
import UserStatus from './UserStatus';

// auth context
// import AuthContext from "../context/auth-v2/authContext.js";

export default function NavMobile() {
  // const authContext = useContext(AuthContext);

  // const { isAuthenticated } = authContext;

  const nav = 'mobile';

  return (
    <UserStatus nav={nav} />
  );
}
