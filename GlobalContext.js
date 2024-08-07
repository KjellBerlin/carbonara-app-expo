import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({
    product: null,
    address: null,
    firstName: null,
    fullName: null,
    auth0UserId: null,
    auth0ClientId: null,
    auth0Domain: null,
    googlePlacesAPIKey: null,
    paidOrders: null,
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

  const updateAPIKeys = (apiKeys) => {
    setState((prevState) => ({
      ...prevState,
      auth0ClientId: apiKeys.auth0ClientId,
      auth0Domain: apiKeys.auth0Domain,
      googlePlacesAPIKey: apiKeys.googlePlacesAPIKey,
    }));
  };

  const updatePaidOrders = (paidOrders) => {
    setState((prevState) => ({
      ...prevState,
      paidOrders,
    }));
  };

  return (
    <GlobalContext.Provider value={{
      state,
      updateProduct,
      updateAddress,
      updateFirstName,
      updateFullName,
      updateAuth0UserId,
      updateAPIKeys,
      updatePaidOrders,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
