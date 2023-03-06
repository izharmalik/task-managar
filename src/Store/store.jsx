import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [authContext, setAuthContext] = useState(false);
  const [userUpdated, setUserUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userAuth = JSON.parse(localStorage.getItem("userAuth"));
    setIsLoading(false);
    userAuth && setAuthContext(userAuth);
  }, []);

  return (
    <AppContext.Provider
      value={{
        authContext,
        isLoading,
        setAuthContext,
        setIsLoading,
        userUpdated,
        setUserUpdated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
