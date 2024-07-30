import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { useNavigation } from '@react-navigation/native';

import { nowTheme } from '../constants';
import { Button } from './index';
import { GlobalContext } from '../GlobalContext';

const { width } = Dimensions.get('screen');

const ProductCard = ({ product, horizontal, full, style, imageStyle }) => {
  const navigation = useNavigation();
  const { state } = useContext(GlobalContext);
  const { address, serviceAvailability } = state;
  const [showError, setShowError] = useState(false);

  const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  const handlePress = () => {
    console.log(serviceAvailability);
    if (address) {
      navigation.navigate('OrderScreen');
    } else {
      setShowError(true);
    }
  };

  useEffect(() => {
    if (address) {
      setShowError(false);
    }
  }, [address]);

  return (
    <Block row={horizontal} card flex style={cardContainer}>
      <Block flex style={imgContainer}>
        <Image resizeMode="cover" source={{ uri: product.productPictureUrl }} style={imageStyles} />
      </Block>
      <Block flex space="between" style={styles.cardDescription}>
        <Block flex center>
          <Text style={styles.productPrice} color={nowTheme.COLORS.PRIMARY}>
            {product.productPrice / 100} €
          </Text>
          <Block flex center>
            <Text style={styles.productName} color={nowTheme.COLORS.HEADER}>
              {product.productName}
            </Text>
          </Block>
          <Block flex center>
            <Text style={styles.longDescription} color={nowTheme.COLORS.DEFAULT}>
              {product.longProductDescription}
            </Text>
          </Block>
        </Block>
        <Button textStyle={styles.buttonText} style={styles.button} onPress={handlePress}>
          Order
        </Button>
        {showError && (
          <Text style={styles.errorText}>
            Please insert a valid address
          </Text>
        )}
      </Block>
    </Block>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    shortProductDescription: PropTypes.string,
    longProductDescription: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productPictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  style: PropTypes.any,
  imageStyle: PropTypes.any,
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },
  fullImage: {
    height: 215,
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  button: {
    marginTop: theme.SIZES.BASE * 1.2,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 12,
  },
  productPrice: {
    fontFamily: 'montserrat-bold',
    marginBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE / 2,
    fontSize: 18,
  },
  productName: {
    fontFamily: 'next-sphere-black',
    marginBottom: theme.SIZES.BASE / 2,
    fontSize: 24,
  },
  longDescription: {
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    padding: 15,
    lineHeight: 14,
    fontSize: 14,
  },
  errorText: {
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    color: 'red',
    marginTop: 0,
  },
});

export default ProductCard;
