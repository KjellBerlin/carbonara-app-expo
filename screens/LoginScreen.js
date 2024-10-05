import React, { useContext, useEffect } from 'react';
import { StyleSheet, StatusBar, Dimensions, Platform, View } from 'react-native';
import { Block, Text, Button } from 'galio-framework';
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { useAuth0 } from 'react-native-auth0';
import * as SecureStore from 'expo-secure-store';
import { GlobalContext } from '../GlobalContext';
import Auth0 from 'react-native-auth0';
import useAPIKeys from '../hooks/useAPIKeys';

const { width, height } = Dimensions.get('screen');

const LoginScreen = ({ navigation }) => {
  const { authorize, user } = useAuth0();
  const loggedIn = user !== undefined && user !== null;
  const { updateFirstName, updateFullName, updateAddress, updateAuth0UserId, updateEmail, updatePhoneNumber } = useContext(GlobalContext);
  useAPIKeys()

  useEffect(() => {
    if (loggedIn === true) navigation.navigate('App');
  }, [loggedIn, navigation]);

  const onLogin = async () => {
    try {
      // Auth0 library not compatible with expo go app
      const credentials = await authorize({
        audience: 'https://api.carbonara-app.com',
        scope: 'create:orders'
      });
      await SecureStore.setItemAsync('jwt_token', credentials.accessToken);
      console.log("Log in successful");

      // Fetch user details after successful login
      const auth0 = new Auth0({ domain: "dev-yntwqm72gdl58ssy.us.auth0.com", clientId: "df43s61p15MI3pp7UoBPV0tEQ0DA6dIc" });
      const userInfo = await auth0.auth.userInfo({ token: credentials.accessToken });

      updateFirstName(userInfo.givenName)
      updateFullName(userInfo.name)
      updateAuth0UserId(userInfo.sub)
      updateEmail(userInfo.email)
      updatePhoneNumber(userInfo.nickname)
      updateAddress(null);
      navigation.navigate('App');
    } catch (error) {
      console.log("Log in failed. Error: "+error);
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
    marginBottom: nowTheme.SIZES.BASE,
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
