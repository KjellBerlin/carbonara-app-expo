import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button } from './index';

const { width } = Dimensions.get('screen');

class OrderCard extends React.Component {

  render() {
    const {
      product,
      horizontal,
      style,
      navigation
    } = this.props;

    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block card flex style={cardContainer}>
        <Block row>
          <Block flex style={styles.textContainer}>
            <Text
              style={{
                fontFamily: 'next-sphere-black',
                fontSize: 18,
                marginBottom: theme.SIZES.BASE / 2
              }}
              color={nowTheme.COLORS.HEADER}
            >
              {product.productName}
            </Text>

            <Block flex left>
              <Text
                style={{
                  fontFamily: 'montserrat-regular',
                  textAlign: 'left',
                  lineHeight: 14
                }}
                size={14}
                color={nowTheme.COLORS.DEFAULT}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempo
              </Text>
            </Block>

            <Text
              size={18}
              style={{
                fontFamily: 'montserrat-bold',
                marginBottom: theme.SIZES.BASE,
                marginTop: theme.SIZES.BASE / 4
              }}
              color={nowTheme.COLORS.PRIMARY}
            >
              {product.productPrice / 100} €
            </Text>
          </Block>

          <Block style={imgContainer}>
            <Image source={{ uri: product.productPictureUrl }} style={styles.imageStyles} />
          </Block>
        </Block>
        <Block flex>
          <Button
            textStyle={{ fontFamily: 'next-sphere-black', fontSize: 10 }}
            small
            center
            color="default"
            style={styles.optionsButton}
            onPress={() => {
              navigation.navigate('ProductScreen')}
            }
          >
            DELETE
          </Button>
        </Block>
      </Block>
    );
  }
}

OrderCard.propTypes = {
  product: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 10
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
    elevation: 2
  },
  button: {
    marginTop: theme.SIZES.BASE * 1.2,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: width - theme.SIZES.BASE * 2,
    height: 34,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginLeft: 15,
    marginRight: 15
  },
  imageStyles: {
    width: width / 3.5,
    height: width / 3.5,
    marginRight: 18,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 3,
  },
  textContainer: {
    marginTop: 23,
    marginLeft: 20,
    marginRight: 0
  }
});

export default withNavigation(OrderCard);

