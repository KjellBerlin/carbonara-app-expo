import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GlobalContext } from '../GlobalContext';

const PRODUCT_QUERY = gql`
    query MEALS {
        activeProduct {
            productId,
            productPrice,
            productName,
            productPictureUrl,
            shortProductDescription,
            longProductDescription
        }
    }
`;

const useProduct = () => {
  const { loading, data, refetch } = useQuery(PRODUCT_QUERY, { fetchPolicy: 'no-cache' });
  const { updateProduct } = useContext(GlobalContext);

  useEffect(() => {
    if (data && data.activeProduct) {
      updateProduct(data.activeProduct); // Update global context with the product data
    }
  }, [data]);

  return { loading, data, refetch };
};

export default useProduct;
