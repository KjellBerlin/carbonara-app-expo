import { Dimensions } from 'react-native';
import { Header } from '../components';
import { nowTheme } from '../constants';

import ComponentScreen from '../screens/ComponentScreen';
import CustomDrawerContent from './Menu';
import ProductScreen from '../screens/ProductScreen';
import LoginScreen from '../screens/LoginScreen';
import React from 'react';
import Register from '../screens/Register';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import OrderScreen from '../screens/OrderScreen';
import AboutScreen from '../screens/AboutScreen';
import OrderStatusScreen from '../screens/OrderStatusScreen';

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ProductStack() {
  return (
    <Stack.Navigator
      initialRouteName="ProductScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Home"
        component={ProductScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" addressSearchHeader heyHeader navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function OrderStack() {
  return (
    <Stack.Navigator
      initialRouteName="OrderScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Order"
        component={OrderScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Order" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function ComponentsStack() {
  return (
    <Stack.Navigator
      initialRouteName="ComponentScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Components"
        component={ComponentScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Components" navigation={navigation} scene={scene} />
          ),
          backgroundColor: '#FFFFFF',
        }}
      />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator
      initialRouteName="AccountScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Account"
        component={Register}
        options={{
          header: ({ navigation, scene }) => (
            <Header transparent title="Account" navigation={navigation} scene={scene} />
          ),
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function AboutStack() {
  return (
    <Stack.Navigator
      initialRouteName="AboutScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="About" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function OrderStatusStack() {
  return (
    <Stack.Navigator
      initialRouteName="OrderStatusScreen"
      screenOptions={{
        headerShown: true,
      }}
    >
      <Stack.Screen
        name="Order Status"
        component={OrderStatusScreen}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Order Status" search options navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: '#FFFFFF' },
        }}
      />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: nowTheme.COLORS.PRIMARY,
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintColor: nowTheme.COLORS.WHITE,
        inactiveTintColor: nowTheme.COLORS.WHITE,
        activeBackgroundColor: 'transparent',
        itemStyle: {
          width: width * 0.75,
          backgroundColor: 'transparent',
          paddingVertical: 16,
          paddingHorizontal: 12,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: 'normal',
        },
      }}
      initialRouteName="ProductScreen"
    >
      <Drawer.Screen
        name="ProductScreen"
        component={ProductStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Order Status"
        component={OrderStatusStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Components"
        component={ComponentsStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Account"
        component={AccountStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutStack}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="OrderScreen"
        component={OrderStack}
        options={{
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

export default function OnboardingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerTransparent: true,
        }}
      />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
