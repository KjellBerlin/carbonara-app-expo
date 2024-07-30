import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';
import { nowTheme } from '../constants';
import { Button } from './index';

const { width } = Dimensions.get('screen');

const OrderCard = ({ product, horizontal, style }) => {
  const navigation = useNavigation();
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  return (
    <Block card flex style={cardContainer}>
      <Block row>
        <Block flex style={styles.productTextContainer}>
          <Text style={styles.productName} color={nowTheme.COLORS.HEADER}>
            {product.productName}
          </Text>
          <Block flex left>
            <Text style={styles.shortDescription} size={14} color={nowTheme.COLORS.DEFAULT}>
              {product.shortProductDescription}
            </Text>
          </Block>
          <Text style={styles.productPrice} size={18} color={nowTheme.COLORS.PRIMARY}>
            {product.productPrice / 100} €
          </Text>
        </Block>
        <Block style={imgContainer}>
          <Image source={{ uri: product.productPictureUrl }} style={styles.imageStyles} />
        </Block>
      </Block>
      <Block flex>
        <Button
          textStyle={styles.buttonText}
          small
          center
          color="default"
          style={styles.optionsButton}
          onPress={() => navigation.navigate('ProductScreen')}
        >
          DELETE
        </Button>
      </Block>
    </Block>
  );
};

OrderCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    shortProductDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productPictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  horizontal: PropTypes.bool,
  style: PropTypes.object,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 10,
  },
  productTextContainer: {
    marginTop: 23,
    marginLeft: 20,
    marginRight: 10,
  },
  productName: {
    fontFamily: 'next-sphere-black',
    fontSize: 18,
    marginBottom: theme.SIZES.BASE / 2,
  },
  shortDescription: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
  },
  productPrice: {
    fontFamily: 'montserrat-bold',
    marginBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE / 4,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
    marginLeft: 20,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  imageStyles: {
    width: width / 3.5,
    height: width / 3.5,
    marginRight: 18,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 3,
  },
  optionsButton: {
    width: width - theme.SIZES.BASE * 2,
    height: 34,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 15,
    marginRight: 15,
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 10,
  },
});

export default OrderCard;
