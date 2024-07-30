import React from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../components';

const { width } = Dimensions.get('screen');

const AboutScreen = () => {
  const navigation = useNavigation();

  const renderContent = () => {
    return (
      <Block flex space="between" style={styles.cardDescription}>
        <Block flex center>
          <Block flex center style={styles.titleContainer}>
            <Text style={styles.title} color={nowTheme.COLORS.HEADER}>
              About carbonara
            </Text>
          </Block>
          <Block flex center>
            <Text style={styles.aboutText} color={nowTheme.COLORS.DEFAULT}>
              Experience the convenience of gourmet cooking with our ready-to-cook food boxes, delivered straight to your door in just 10 minutes. Each box is thoughtfully curated with all the fresh ingredients you need to create a delicious and healthy meal at home. Our unique approach of offering one meal per day ensures you enjoy the highest quality ingredients while helping to minimize food waste. Join us in making cooking easy, enjoyable, and sustainable.
            </Text>
          </Block>
          <Button textStyle={styles.buttonText} style={styles.button} onPress={() => navigation.navigate('Home')}>
            Order now
          </Button>
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
    marginTop: theme.SIZES.BASE * 2,
  },
  title: {
    fontFamily: 'next-sphere-black',
    marginBottom: theme.SIZES.BASE,
    fontSize: 24,
  },
  aboutText: {
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    padding: 15,
    lineHeight: 20,
    fontSize: 14,
    marginBottom: theme.SIZES.BASE * 2,
  },
  button: {
    marginTop: theme.SIZES.BASE * 1.2,
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 12,
  },
});

export default AboutScreen;
