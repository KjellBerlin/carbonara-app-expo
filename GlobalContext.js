import React, { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    product: null,
    address: null,
  });

  const updateProduct = (product) => {
    setState((prevState) => ({
      ...prevState,
      product,
    }));
  };

  const updateAddress = (address) => {
    setState((prevState) => ({
      ...prevState,
      address,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateProduct, updateAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

