import React, { createContext, useState } from 'react';

// Create a context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    product: null,
    address: null,
    firstName: null,
    fullName: null,
    auth0UserId: null
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

  const updateFirstName = (firstName) => {
    setState((prevState) => ({
      ...prevState,
      firstName,
    }));
  };

  const updateFullName = (fullName) => {
    setState((prevState) => ({
      ...prevState,
      fullName,
    }));
  };

  const updateAuth0UserId = (auth0UserId) => {
    setState((prevState) => ({
      ...prevState,
      auth0UserId,
    }));
  };

  return (
    <GlobalContext.Provider value={{ state, updateProduct, updateAddress, updateFirstName, updateFullName, updateAuth0UserId }}>
      {children}
    </GlobalContext.Provider>
  );
};

