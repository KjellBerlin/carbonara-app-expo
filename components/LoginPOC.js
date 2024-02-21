import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';

const LoginPOC = () => {
  const {authorize, clearSession, user, error, isLoading} = useAuth0();

  const onLogin = async () => {
    try {
      // TODO: figure out how to get auth code here
      // TODO: BE request to get auth token
      const credentials = await authorize()
      console.log("AccessToken: "+credentials.accessToken)

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
    <View>
      <Button
        onPress={loggedIn ? onLogout : onLogin}
        title={loggedIn ? 'Log Out' : 'Log In'}
      />
      <Text
        style={{ letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center', color: 'white'}}
        size={30}
      >
        {loggedIn && <Text>You are logged in as {user.name}</Text>}
        {!loggedIn && <Text>You are not logged in</Text>}
        {error && <Text>{error.message}</Text>}
      </Text>
    </View>
  );
};

export default LoginPOC;
