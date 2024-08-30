import { gql, useMutation } from '@apollo/client';
import { useContext } from 'react';
import { GlobalContext } from '../GlobalContext';

const CREATE_ORDER_MUTATION = gql`
    mutation CREATE_ORDER(
        $auth0UserId: String!,
        $userName: String!,
        $street: String!,
        $streetNumber: String!,
        $postCode: String!,
        $city: String!,
        $productId: String!,
        $googlePlaceId: String!
    ) {
        createOrder(
            createOrderInput: {
                auth0UserId: $auth0UserId
                userName: $userName
                deliveryAddress: {
                    name: $userName
                    street: $street
                    streetNumber: $streetNumber
                    postCode: $postCode
                    city: $city
                    googlePlaceId: $googlePlaceId
                }
                productsIds: [$productId]
            }
        ) {
            orderId
            paymentRedirectionLink
        }
    }
`;

const useCreateOrder = () => {
    const { state } = useContext(GlobalContext);
    const { auth0UserId, fullName, product, address } = state;

    const [createOrder, { loading, data }] = useMutation(CREATE_ORDER_MUTATION);

    const orderVariables = {
        auth0UserId,
        userName: fullName,
        street: address.street,
        streetNumber: address.streetNumber,
        postCode: address.postCode,
        city: address.city,
        googlePlaceId: address.googlePlaceId,
        productId: product.productId
    };

    const handleCreateOrder = () => {
        createOrder({ variables: orderVariables });
    };

    return { loading, data, createOrder: handleCreateOrder };
}

export default useCreateOrder;

