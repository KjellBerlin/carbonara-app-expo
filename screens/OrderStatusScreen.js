import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { withNavigation } from '@react-navigation/compat';

const { width } = Dimensions.get('screen');

const OrderStatusScreen = ({ navigation }) => {

  const renderContent = () => {
    return (
      <Block flex space="between" style={styles.cardDescription}>
        <Block flex center>
          <Block flex center style={styles.titleContainer}>
            <Text style={styles.title} color={nowTheme.COLORS.HEADER}>
              order Statuses
            </Text>
          </Block>
        </Block>
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
  cardDescription: {
    padding: theme.SIZES.BASE / 2,
  },
  titleContainer: {
    marginTop: theme.SIZES.BASE * 2, // Increased margin from the top
  },
  title: {
    fontFamily: 'next-sphere-black',
    marginBottom: theme.SIZES.BASE / 2,
    fontSize: 24,
  },
});

export default withNavigation(OrderStatusScreen);





