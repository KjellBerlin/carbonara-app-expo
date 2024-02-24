import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform, View } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');
import { nowTheme } from '../constants/';
import { HeaderHeight } from '../constants/utils';
import { useAuth0 } from 'react-native-auth0';

const Onboarding = ({ navigation }) => {
  const {authorize, clearSession, user, isLoading} = useAuth0();

  const onLogin = async () => {
    try {
      const credentials = await authorize()
      console.log("AccessToken: "+credentials.accessToken)
      // TODO: BE request to get final auth jwt token

      navigation.navigate('App')
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  if (isLoading) {
    return <View><Text>Loading</Text></View>;
  }

  const loggedIn = user !== undefined && user !== null;

  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex>
        <Block space="between" style={styles.padded}>
          <Block>
            <Text
              style={{
                fontFamily: 'next-sphere-black', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
              }}
              color="white"
              size={30}
            >
              Carbonara
            </Text>
          </Block>
          <Block
            row
            style={{
              marginTop: theme.SIZES.BASE * 13.5,
              marginBottom: theme.SIZES.BASE
            }}
          >
            <Button
              textStyle={{ fontFamily: 'next-sphere-black', fontSize: 12 }}
              style={styles.button}
              onPress={loggedIn ? onLogout : onLogin}
            >
              {loggedIn ? 'Log Out' : 'Log In'}
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Onboarding;


const styles = StyleSheet.create({
  container: {
    backgroundColor: nowTheme.COLORS.BLACK,
    marginTop: Platform.OS === 'android' ? - HeaderHeight : 0
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 7
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  }
});
