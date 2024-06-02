import React, { useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform, View } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { useAuth0 } from 'react-native-auth0';
import * as SecureStore from 'expo-secure-store';

const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {
  const { authorize, user } = useAuth0();
  const loggedIn = user !== undefined && user !== null;

  useEffect(() => {
      if (loggedIn === true) navigation.navigate('App');
    },
    [loggedIn, navigation] // Adding dependencies for useEffect
  );

  const onLogin = async () => {
    try {
      const credentials = await authorize({
        audience: 'https://api.carbonara-app.com',
        scope: 'create:orders'
      });
      await SecureStore.setItemAsync('jwt_token', credentials.accessToken);
      console.log("Log in successful");
      // console.log(credentials.accessToken)
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
    flex: 1,
    alignItems: 'center',
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

export default LoginScreen;
