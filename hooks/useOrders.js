import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GlobalContext } from '../GlobalContext';

const PAID_ORDERS_QUERY = gql`
    query GetPaidOrders($userId: String!) {
        paidOrders(userId: $userId) {
            orderId
            orderStatus
            createdAt
            productDtos {
                productName
                productPictureUrl
                productPrice
            }
            deliveryAddress {
                street
                streetNumber
                postCode
                city
            }
        }
    }
`;

const useOrders = () => {
  const { state, updatePaidOrders } = useContext(GlobalContext);
  const { auth0UserId } = state;

  const { loading, data, refetch } = useQuery(PAID_ORDERS_QUERY, {
    variables: { userId: auth0UserId },
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (data && data.paidOrders) {
      updatePaidOrders(data.paidOrders);
    }
  }, [data]);

  return { loading, data, refetch };
};

export default useOrders;

