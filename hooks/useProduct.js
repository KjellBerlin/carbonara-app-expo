import { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GlobalContext } from '../GlobalContext';

const PRODUCT_QUERY = gql`
    query MEALS {
        activeProduct {
            productId,
            productPrice,
            productName,
            productPictureUrl
        }
    }
`;

const useProduct = () => {
  const { loading, data } = useQuery(PRODUCT_QUERY, { fetchPolicy: 'cache-and-network' });
  const { updateProduct } = useContext(GlobalContext);

  useEffect(() => {
    if (data && data.activeProduct) {
      updateProduct(data.activeProduct); // Update global context with the product data
    }
  }, [data]);

  return { loading, data };
};

export default useProduct;
