import React from 'react';
import { Image } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { Block, GalioProvider } from 'galio-framework';
import { NavigationContainer } from '@react-navigation/native';

import Screens from './navigation/Screens';
import { Images, nowTheme } from './constants';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { Auth0Provider } from 'react-native-auth0';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';

import { GlobalProvider } from './GlobalContext'; // Import the GlobalProvider

// cache app images
const assetImages = [
  Images.RegisterBackground
];

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

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
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
  }

  _loadResourcesAsync = async () => {
    await Font.loadAsync({
      'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
      'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf'),
      'next-sphere-black': require('./assets/font/Next-Sphere-Black.ttf'),
      'next-sphere-thin': require('./assets/font/Next-Sphere-Thin.ttf'),
    });

    this.setState({ fontLoaded: true });
    return Promise.all([...cacheImages(assetImages)]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    if (this.state.fontLoaded) {
      this.setState({ isLoadingComplete: true });
    }
  };
}

