import React, { useContext, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import AddressCard from '../components/AddressCard';
import { GlobalContext } from '../GlobalContext';
import { Button } from '../components';
import useCreateOrder from '../hooks/useCreateOrder';

const { width } = Dimensions.get("screen");

const OrderScreen = () => {
  const { state } = useContext(GlobalContext);
  const { fullName, product, address } = state;

  const [additionalDetailsFocus, setAdditionalDetailsFocus] = useState(false);

  // Call the hook at the top level of the component
  const { data, createOrder } = useCreateOrder();

  const handlePress = () => {
    createOrder();
    console.log("Order: " + data.createOrder.orderId + " Redirect link: " + data.createOrder.paymentRedirectionLink);
  };

  const renderCards = () => {
    return (
      <Block>
        <OrderCard
          key={0}
          product={product}
          full
          titleStyle={styles.productTitle}
          imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
        />
        <AddressCard
          fullName={fullName}
          address={address}
          additionalDetailsFocus={additionalDetailsFocus}
          setAdditionalDetailsFocus={setAdditionalDetailsFocus}
        />
        <Block>
          <Button
            textStyle={{ fontFamily: 'next-sphere-black', fontSize: 12 }}
            style={styles.button}
            onPress={handlePress}
          >
            Order with obligation to pay
          </Button>
        </Block>
      </Block>
    );
  };

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30, width }}
      >
        {renderCards()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width: width
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'next-sphere-black',
    fontSize: 18
  },
  button: {
    marginTop: 60,
    width: width - theme.SIZES.BASE * 2,
    marginLeft: 16,
  },
});

export default OrderScreen;
