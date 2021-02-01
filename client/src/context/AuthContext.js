import React, { useContext, useState, useEffect } from 'react';
import authAPI from '../utils/auth-API';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // create the state objects
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // check for a currently logged in user from the api
    authAPI.getCurrentUser().then((data) => {
      // if the check comes back as a success, then set the userState object to the logged in user and set isAuthenticated to true
      if (data.status === 200) {
        setCurrentUser({ user: data, isAuthenticated: true });
        setLoading(false);
      }
    });
    if (!currentUser) {
      setCurrentUser({ user: null, isAuthenticated: false });
      setLoading(false);
    }
  }, []);

  console.log(currentUser);

  return (
    <AuthContext.Provider value={currentUser}>
      {/* If not loading, then render out the children. Otherwise, don't render out the children */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
