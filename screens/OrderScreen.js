import React from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text } from 'galio-framework';

import { nowTheme } from '../constants';
const { width } = Dimensions.get("screen");

class OrderScreen extends React.Component {

  render() {
    return (
      <Block flex center style={styles.home}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30, width }}
        >
          <Text>hello1</Text>
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
