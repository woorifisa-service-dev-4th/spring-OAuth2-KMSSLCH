"use client";

import { createContext, useContext, useState, useEffect } from "react";

const OAuthContext = createContext(null);

export const OAuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return (
    <OAuthContext.Provider value={{ token, setToken }}>
      {children}
    </OAuthContext.Provider>
  );
};

export const useOAuthContext = () => {
  return useContext(OAuthContext);
}
