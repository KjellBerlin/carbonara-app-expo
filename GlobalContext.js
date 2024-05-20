import React, { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    product: null
  });

  const updateProduct = (product) => {
    setState((prevState) => ({
      ...prevState,
      product,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateProduct }}>
      {children}
    </GlobalContext.Provider>
  );
};

