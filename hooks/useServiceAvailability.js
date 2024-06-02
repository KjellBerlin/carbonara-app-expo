import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const SERVICE_AVAILABILITY_QUERY = gql`
    query SERVICE_AVAILABILITY($googlePlaceId: String!) {
        serviceAvailability(googlePlaceId: $googlePlaceId) {
            available
            address {
                city
                name
                postCode
                street
                streetNumber
            }
            addressIncomplete
        }
    }
`;

const useServiceAvailability = () => {
  const [googlePlaceId, setGooglePlaceId] = useState('');
  const [serviceAvailability, setServiceAvailability] = useState(null);

  const [fetchServiceAvailability, { loading, data, error }] = useLazyQuery(SERVICE_AVAILABILITY_QUERY, {
    variables: { googlePlaceId },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setServiceAvailability(data.serviceAvailability);
    }
  });

  const handleAddressSelect = (data, details = null) => {
    if (details && details.place_id) {
      setGooglePlaceId(details.place_id);
      fetchServiceAvailability();
    }
  };

  return {
    googlePlaceId,
    serviceAvailability,
    loading,
    error,
    handleAddressSelect
  };
};

export default useServiceAvailability;
