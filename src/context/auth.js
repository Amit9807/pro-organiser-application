import React, { useEffect, useState } from 'react';

import fire from '../config/fire';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log("Auth",user.uid);
    });
  }, []);

  return (
    <div>
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      
      {children}
    </AuthContext.Provider>
    </div>
  );
};



