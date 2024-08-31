import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('screen');

const getProgress = (status) => {
  switch (status) {
    case 'NONE':
      return { progress: 0.0, color: nowTheme.COLORS.PRIMARY };
    case 'FINDING_AVAILABLE_RIDER':
      return { progress: 0.25, color: nowTheme.COLORS.PRIMARY };
    case 'RIDER_ASSIGNED':
      return { progress: 0.5, color: nowTheme.COLORS.PRIMARY };
    case 'DELIVERY_IN_PROGRESS':
      return { progress: 0.75, color: nowTheme.COLORS.PRIMARY };
    case 'DELIVERED':
      return { progress: 1.0, color: nowTheme.COLORS.PRIMARY };
    case 'PAYMENT_FAILED':
      return { progress: 1.0, color: nowTheme.COLORS.DEFAULT };
    case 'CANCELLED':
      return { progress: 1.0, color: nowTheme.COLORS.DEFAULT };
    default:
      return { progress: 0.0, color: nowTheme.COLORS.DEFAULT };
  }
};

const OrderStatusCard = ({ product, orderStatus, deliveryAddress, createdAt, horizontal, style }) => {
  const cardContainer = [styles.card, styles.shadow, style];
  const imgContainer = [
    styles.imageContainer,
    horizontal ? styles.horizontalStyles : styles.verticalStyles,
    styles.shadow,
  ];

  const { progress, color } = getProgress(orderStatus);

  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Block card flex style={cardContainer}>
      <Block row>
        <Block flex style={styles.productTextContainer}>
          <Text style={styles.productName} color={nowTheme.COLORS.HEADER}>
            {product.productName}
          </Text>
          <Block flex left>
            <Text style={styles.deliveryAddress} size={14} color={nowTheme.COLORS.DEFAULT}>
              {deliveryAddress.street} {deliveryAddress.streetNumber}, {deliveryAddress.postCode} {deliveryAddress.city}
            </Text>
          </Block>
          <Text style={styles.createdAt} size={14} color={nowTheme.COLORS.DEFAULT}>
            {formattedDate}
          </Text>
          <Text style={styles.productPrice} size={18} color={nowTheme.COLORS.PRIMARY}>
            {product.productPrice / 100} €
          </Text>
        </Block>
        <Block style={imgContainer}>
          <Image source={{ uri: product.productPictureUrl }} style={styles.imageStyles} />
        </Block>
      </Block>
      <Block flex style={styles.progressBarContainer}>
        <ProgressBar progress={progress} color={color} style={styles.progressBar} />
        <Text style={styles.orderStatus}>{orderStatus.replace('_', ' ')}</Text>
      </Block>
    </Block>
  );
};

OrderStatusCard.propTypes = {
  product: PropTypes.shape({
    productName: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    productPictureUrl: PropTypes.string.isRequired,
  }).isRequired,
  orderStatus: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.shape({
    street: PropTypes.string.isRequired,
    streetNumber: PropTypes.string.isRequired,
    postCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
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
  createdAt: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
    marginTop: 5,
  },
  deliveryAddress: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
    marginTop: 5,
  },
  productPrice: {
    fontFamily: 'montserrat-bold',
    marginBottom: theme.SIZES.BASE,
    marginTop: theme.SIZES.BASE / 3,
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
    width: width / 4,
    height: width / 4,
    marginRight: 18,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 3,
  },
  progressBarContainer: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 7,
  },
  orderStatus: {
    fontFamily: 'next-sphere-thin',
    fontSize: 11,
    marginTop: 7,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
  },
});

export default OrderStatusCard;
