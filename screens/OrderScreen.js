import React from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../constants';
import { gql, useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import OrderCard from '../components/OrderCard';
const { width } = Dimensions.get("screen");

// TODO: get data via props

const PRODUCT_QUERY = gql`
    query MEALS{
      activeProduct{
        productId,
        productPrice,
        productName,
        productPictureUrl
      }
    }
`

export const Product = () => {
  const {loading, data} = useQuery(PRODUCT_QUERY, { fetchPolicy: "cache-and-network" })
  if (loading) {
    return <Loading />
  }
  if (data == null) {
    return (
      <Block>
        <Text>Error loading product data</Text>
      </Block>
    );
  }
  return (
    <Block>
      <OrderCard key={0} item={data.activeProduct} full titleStyle={styles.productTitle} imageStyle={ { height: 300, width: '100%', resizeMode: 'cover' } }/>
    </Block>
  );
};

class OrderScreen extends React.Component {

  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Product/>
      </Block>

    );
  };

  render() {
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          {this.renderCards()}
        </ScrollView>
      </Block>
    );
  }
}

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
