import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GlobalContext } from '../GlobalContext';

const API_KEYS_QUERY = gql`
    query GooglePlacesAPIKey {
        apiKeys {
            googlePlacesAPIKey
        }
    }
`;

const useAPIKeys = () => {
  const { loading, data } = useQuery(API_KEYS_QUERY, { fetchPolicy: 'cache-and-network' });
  const { updateAPIKeys } = useContext(GlobalContext);

  useEffect(() => {
    if (data && data.apiKeys) {
      updateAPIKeys(data.apiKeys); // Update global context with the API keys data
    }
  }, [data]);

  return { loading,  data };
};

export default useAPIKeys;
