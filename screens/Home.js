import React from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block } from 'galio-framework';

import { Card } from "../components";
import { nowTheme } from '../constants';
import { gql, useQuery } from '@apollo/client';
import Loading from '../components/Loading';
const { width } = Dimensions.get("screen");

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
  return (
    <Block>
      <Card key={0} item={data.activeProduct} full titleStyle={styles.productTitle} imageStyle={ { height: 300, width: '100%', resizeMode: 'cover' } }/>
    </Block>
  );
};

class Home extends React.Component {

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

export default Home;
