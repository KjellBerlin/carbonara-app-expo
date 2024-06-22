import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { Input } from '../components';

const AddressCard = ({ fullName, address, additionalDetailsFocus, setAdditionalDetailsFocus }) => {
  return (
    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
      <Text style={styles.addressTitle} color={nowTheme.COLORS.HEADER}>address:</Text>
      {address && (
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
  );
};

const styles = StyleSheet.create({
  addressTitle: {
    fontFamily: 'next-sphere-black',
    fontSize: 18,
    marginTop: 22,
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

export default AddressCard;
