import React, { useContext } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import { GlobalContext } from '../GlobalContext'; // Import the GlobalContext

const { width } = Dimensions.get("screen");

const OrderScreen = () => {
  const { state } = useContext(GlobalContext); // Use the context to get the product
  const { product } = state;

  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <OrderCard key={0} product={product} full titleStyle={styles.productTitle} imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }} />
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
  }
});

export default OrderScreen;

