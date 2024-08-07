import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import { GlobalContext } from '../GlobalContext';
import usePaidOrders from '../hooks/usePaidOrders';

const { width } = Dimensions.get('screen');

const OrderStatusScreen = () => {
  const { loading, data } = usePaidOrders();

  const renderCards = () => {
    if (loading) {
      return <Block><Text>Loading...</Text></Block>;
    }

    const paidOrders = data?.paidOrders;
    console.log('Paid orders:', paidOrders)

    if (paidOrders && paidOrders.length > 0) {
      return paidOrders.map((order, index) => {
        const product = order.productDtos[0]; // Always display first product of this order
        return (
          <OrderCard
            key={index}
            product={product}
            full
            titleStyle={styles.productTitle}
            imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
          />
        );
      });
    }

    return <Block><Text>No orders found.</Text></Block>;
  };

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {renderCards()}
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width,
  },
  scrollContainer: {
    paddingBottom: 30,
    width,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'next-sphere-black',
    fontSize: 18,
  },
  button: {
    marginTop: 60,
    width: width - theme.SIZES.BASE * 2,
    marginLeft: 16,
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 12,
  },
});

export default OrderStatusScreen;
