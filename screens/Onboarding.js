import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform, View } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { useAuth0 } from 'react-native-auth0';

const { width, height } = Dimensions.get('screen');

const Onboarding = ({ navigation }) => {
  const { authorize, user } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {
      if (loggedIn === true) navigation.navigate('App');
    },
    [loggedIn, navigation] // Adding dependencies for useEffect
  );

  const onLogin = async () => {
    try {
      const credentials = await authorize();
      console.log("AccessToken: " + credentials.accessToken);
      console.log("Expires: " + credentials.expiresAt);
      console.log("Log in successful");
      navigation.navigate('App');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={{ height: height, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={styles.title}
          color="white"
          size={30}
        >
          Carbonara
        </Text>
      </View>
      <View style={{ position: 'absolute', bottom: height * 0.14, width: '100%', alignItems: 'center' }}>
        <Button
          textStyle={styles.buttonText}
          style={styles.button}
          onPress={onLogin}
        >
          LOG IN   I   SIGN UP
        </Button>
      </View>
    </Block>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    flex: 1,
    alignItems: 'center', // This ensures that children align center horizontally
  },
  content: {
    paddingHorizontal: nowTheme.SIZES.BASE * 2,
  },
  title: {
    fontFamily: 'next-sphere-black',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: nowTheme.SIZES.BASE, // Adjust as needed
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 12,
  },
  button: {
    width: width - nowTheme.SIZES.BASE * 4,
    height: nowTheme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  }
});
