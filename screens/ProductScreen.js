import React, { useContext, useEffect } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '../constants';
import { gql, useQuery } from '@apollo/client';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import { GlobalContext } from '../GlobalContext'; // Import the GlobalContext

const { width } = Dimensions.get("screen");

const PRODUCT_QUERY = gql`
  query MEALS {
    activeProduct {
      productId,
      productPrice,
      productName,
      productPictureUrl
    }
  }
`;

export const Product = () => {
  const { loading, data } = useQuery(PRODUCT_QUERY, { fetchPolicy: "cache-and-network" });
  const { updateProduct } = useContext(GlobalContext); // Use the context

  useEffect(() => {
    if (data && data.activeProduct) {
      updateProduct(data.activeProduct); // Update the context with the product data
    }
  }, [data]);

  if (loading) {
    return <Loading />;
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
      <ProductCard key={0} product={data.activeProduct} full titleStyle={styles.productTitle} imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }} />
    </Block>
  );
};

class ProductScreen extends React.Component {
  renderCards = () => {
    return (
      <Block flex style={styles.group}>
        <Product />
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

export default ProductScreen;

