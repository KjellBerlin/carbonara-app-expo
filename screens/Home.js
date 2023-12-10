import React from "react";
import { StyleSheet, Dimensions, ScrollView, Animated } from 'react-native';
import { Block } from "galio-framework";

import { Card } from "../components";
import articles from "../constants/articles";
import { nowTheme } from '../constants';
const { width } = Dimensions.get("screen");

class Home extends React.Component {

  // TODO: fetch articles from server

  renderCards = () => {
    scrollX = new Animated.Value(0);
    const cards = [articles[5], articles[6]]
    return (
      <Block flex style={styles.group}>

        <ScrollView
          horizontal={true}
          style={styles.contentContainer}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{
            width: width * 2
          }}>
          {cards.map((item, index) => {
            return <Card key={index} item={item} full titleStyle={styles.productTitle} imageStyle={ { height: 300, width: '100%', resizeMode: 'contain' } }/>
          })}
        </ScrollView>

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
    fontFamily: 'montserrat-bold',
    fontSize: 18
  }
});

export default Home;
