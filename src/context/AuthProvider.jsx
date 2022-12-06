import React, { createContext, useContext, useState } from "react";

const Auth = createContext({});

export const useAuth = () => useContext(Auth);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  return (
    <Auth.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
