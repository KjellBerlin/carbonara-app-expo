import { useState, useContext } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { GlobalContext } from '../GlobalContext';

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
  const { updateAddress } = useContext(GlobalContext);

  const [fetchServiceAvailability, { loading, error }] = useLazyQuery(SERVICE_AVAILABILITY_QUERY, {
    variables: { googlePlaceId },
    fetchPolicy: "cache-and-network",
    onCompleted: (data) => {
      setServiceAvailability(data.serviceAvailability);

      if (data.serviceAvailability.available && data.serviceAvailability.address) {
        updateAddress(data.serviceAvailability.address);
      }
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
