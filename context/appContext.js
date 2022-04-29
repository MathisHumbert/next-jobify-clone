import React, { useContext, useState, createContext, useEffect } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [showSmallSidebar, setShowSmallSidebar] = useState(false);
  const [showBigSidebar, setShowBigSidebar] = useState(true);

  return (
    <AppContext.Provider
      value={{
        showSmallSidebar,
        setShowSmallSidebar,
        showBigSidebar,
        setShowBigSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
