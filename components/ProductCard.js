import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { nowTheme } from '../constants';
import { Button } from './index';
import * as navigation from '@react-navigation/compat/src/helpers';

const { width } = Dimensions.get('screen');

class ProductCard extends React.Component {

  render() {
    const {
      item,
      horizontal,
      full,
      style,
      imageStyle
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <Block flex style={imgContainer}>
          <Image resizeMode="cover" source={{ uri: item.productPictureUrl }} style={imageStyles} />
        </Block>
          <Block flex space="between" style={styles.cardDescription}>
            <Block flex center>
              <Text
                size={18}
                style={{
                  fontFamily: 'montserrat-bold',
                  marginBottom: theme.SIZES.BASE,
                  marginTop: theme.SIZES.BASE /2
              }}
                color={nowTheme.COLORS.PRIMARY}
              >
                {item.productPrice/100} €
              </Text>
              {item.productName ? (
                <Block flex center>
                  <Text
                    h6
                    style={{
                      fontFamily: 'next-sphere-black',
                      marginBottom: theme.SIZES.BASE / 2
                  }}
                    color={nowTheme.COLORS.SECONDARY}
                  >
                    {item.productName}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
              {item.productName ? (
                <Block flex center>
                  <Text
                    style={{
                      fontFamily: 'next-sphere-thin',
                      textAlign: 'center',
                      padding: 15,
                      lineHeight: 14
                  }}
                    size={14}
                    color={nowTheme.COLORS.BLACK}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
            </Block>
            <Button textStyle={{ fontFamily: 'next-sphere-black', fontSize: 12 }}
                    style={styles.button}
                    onPress={() => navigation.navigate('Pro')}
            >
              Order
            </Button>
          </Block>
      </Block>
    );
  }
}

ProductCard.propTypes = {
  item: PropTypes.object,
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
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 4
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
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
    marginTop: theme.SIZES.BASE*1.2,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
});

export default withNavigation(ProductCard);
