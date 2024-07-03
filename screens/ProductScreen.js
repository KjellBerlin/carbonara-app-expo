import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';
import { nowTheme } from '../constants';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import useProduct from '../hooks/useProduct';

const { width } = Dimensions.get('screen');

const ProductScreen = () => {
  const { loading, data } = useProduct();

  const renderContent = () => {
    if (loading) {
      return <Loading />;
    }
    if (!data) {
      return (
        <Block>
          <Text>Error loading product data</Text>
        </Block>
      );
    }
    return (
      <Block>
        <ProductCard
          key={0}
          product={data.activeProduct}
          full
          titleStyle={styles.productTitle}
          imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
        />
      </Block>
    );
  };

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <Block flex style={styles.group}>
          {renderContent()}
        </Block>
      </ScrollView>
    </Block>
  );
};

const styles = StyleSheet.create({
  home: {
    width,
  },
  scrollContainer: {
    paddingBottom: 30,
    width,
  },
  group: {
    flex: 1,
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'next-sphere-black',
    fontSize: 18,
  },
});

export default ProductScreen;
