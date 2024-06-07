import React, { useContext, useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, theme, Text } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import { GlobalContext } from '../GlobalContext';
import { Input } from '../components';

const { width } = Dimensions.get("screen");

const OrderScreen = () => {
  const { state } = useContext(GlobalContext);
  const { fullName, product, address } = state;

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
          <Text style={styles.addressTitle} color={nowTheme.COLORS.HEADER}>address:</Text>
          {address && (
            // TODO: Remove hardcoded name
            <Block>
              <Text style={styles.addressText}>{fullName}</Text>
              <Text style={styles.addressText}>{address.street} {address.streetNumber}</Text>
              <Text style={styles.addressText}>{address.postCode} {address.city}</Text>
            </Block>
          )}
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
  },
  addressTitle: {
    fontFamily: 'next-sphere-black',
    fontSize: 18,
    paddingTop: 12,
    paddingBottom: 2,
    marginBottom: theme.SIZES.BASE / 2,
    marginLeft: 6
  },
  addressText: {
    color: nowTheme.COLORS.DEFAULT,
    textAlign: 'left',
    fontFamily: 'montserrat-regular',
    fontSize: 14,
    marginLeft: 6,
    marginBottom: 2,
  },
});

export default OrderScreen;
