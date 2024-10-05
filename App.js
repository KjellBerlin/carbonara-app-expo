import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-get-random-values';

import Screens from './navigation/Screens';
import { nowTheme } from './constants';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from 'react-native-auth0';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

import { GlobalProvider } from './GlobalContext';

const httpLink = createHttpLink({
  uri: 'https://carbonara-core-mkvkriomda-ew.a.run.app/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await SecureStore.getItemAsync('jwt_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
    this._loadResourcesAsync();
  }

  render() {
    if (!this.state.isLoadingComplete) {
      return null; // Keep the splash screen visible while resources are loading
    }

    return (
      <Auth0Provider domain={"dev-yntwqm72gdl58ssy.us.auth0.com"} clientId={"df43s61p15MI3pp7UoBPV0tEQ0DA6dIc"}>
        <ApolloProvider client={client}>
          <GlobalProvider>
            <NavigationContainer>
              <GalioProvider theme={nowTheme}>
                <Block flex>
                  <Screens />
                </Block>
              </GalioProvider>
            </NavigationContainer>
          </GlobalProvider>
        </ApolloProvider>
      </Auth0Provider>
    );
  }

  _loadResourcesAsync = async () => {
    try {
      await Font.loadAsync({
        'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
        'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
        'next-sphere-black': require('./assets/font/Next-Sphere-Black.ttf'),
        'next-sphere-thin': require('./assets/font/Next-Sphere-Thin.ttf'),
      });

      this.setState({ isLoadingComplete: true }, async () => {
        await SplashScreen.hideAsync();
      });
    } catch (error) {
      this._handleLoadingError(error);
    }
  };

  _handleLoadingError = error => {
    console.warn("Loading error: ", error);
  };
}
