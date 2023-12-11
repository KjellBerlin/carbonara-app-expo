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
      imageStyle,
      titleStyle
    } = this.props;

    const imageStyles = [full ? styles.fullImage : styles.horizontalImage, imageStyle];
    const titleStyles = [styles.cardTitle, titleStyle];
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
            <Block flex>
              <Text
                style={{ fontFamily: 'montserrat-regular' }}
                size={14}
                style={titleStyles}
                color={nowTheme.COLORS.SECONDARY}
              >
                {item.productPrice/100} €
              </Text>
              {item.productName ? (
                <Block flex center>
                  <Text
                    style={{ fontFamily: 'montserrat-regular' }}
                    size={32}
                    color={nowTheme.COLORS.BLACK}
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
                    style={{ fontFamily: 'montserrat-regular', textAlign: 'center', padding: 15 }}
                    size={14}
                    color={"#9A9A9A"}
                  >
                    {item.productName}
                  </Text>
                </Block>
              ) : (
                  <Block />
                )}
            </Block>
            <Button textStyle={{ fontFamily: 'montserrat-regular', fontSize: 12 }}
                    style={styles.button}
                    onPress={() => navigation.navigate('Pro')}
            >
              ADD TO CART
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
  cardTitle: {
    paddingHorizontal: 9,
    paddingTop: 7,
    paddingBottom: 15
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  image: {
    // borderRadius: 3,
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
  articleButton: {
    fontFamily: 'montserrat-bold',
    paddingHorizontal: 9,
    paddingVertical: 7
  },
  button: {
    marginTop: theme.SIZES.BASE*1.2,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
});

export default withNavigation(ProductCard);
