// src/context/AppContext.js
import React, { createContext, useState, useContext } from 'react';

const appContext = createContext();

export function AppProvider({ children }) {
  const [sidebarHidden, setSidebarHidden] = useState(false);

  return (
    <appContext.Provider value={{ sidebarHidden, setSidebarHidden }}>
      {children}
    </appContext.Provider>
  );
}

export function useAppContext() {
  return useContext(appContext);
}
