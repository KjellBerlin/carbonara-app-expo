import React, { useContext, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import { GlobalContext } from '../GlobalContext';
import { Input } from '../components';

const { width } = Dimensions.get("screen");

const OrderScreen = () => {
  const { state } = useContext(GlobalContext);
  const { product } = state;

  const [additionalDetailsFocus, setAdditionalDetailsFocus] = useState(false);

  const renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <OrderCard
          key={0}
          product={product}
          full
          titleStyle={styles.productTitle}
          imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
        />
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input
            primary={additionalDetailsFocus}
            right
            placeholder="Additional details"
            onFocus={() => setAdditionalDetailsFocus(true)}
            onBlur={() => setAdditionalDetailsFocus(false)}
            iconContent={<Block />}
            shadowless
          />
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
  }
});

export default OrderScreen;
