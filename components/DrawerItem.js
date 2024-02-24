import { Block, Text, theme } from 'galio-framework';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Icon from './Icon';
import React from 'react';
import nowTheme from '../constants/Theme';
import { useAuth0 } from 'react-native-auth0';
import Onboarding from '../screens/Onboarding';

const DrawerItem = ({ title, focused, navigation }) => {

  const renderIcon = () => {
    switch (title) {
      case 'Home':
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Components':
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'Account':
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
            style={{ opacity: 0.5 }}
          />
        );
      case 'LOGOUT':
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: 'rgba(0,0,0,0.5)', opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          />
        );
      default:
        return null;
    }
  };

  const containerStyles = [
    styles.defaultStyle,
    focused ? [styles.activeStyle, styles.shadow] : null,
  ];

  const {clearSession} = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
      navigation.navigate(title === 'LOGOUT' ? 'Onboarding' : title)
      console.log('Log out successful')
    } catch (e) {
      console.log('Log out cancelled');
    }
  };

  return (
    <TouchableOpacity
      style={{ height: 60 }}
      onPress={() => {
        if (title === 'LOGOUT') {
          onLogout().then(r =>
          navigation.navigate('Home')) // Navigate to Home when log out not successful
        } else {
          navigation.navigate(title)
        }
      }}
    >
      <Block flex row style={containerStyles}>
        <Block middle flex={0.1} style={{ marginRight: 5 }}>
          {renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text
            style={{
              fontFamily: 'next-sphere-thin',
              textTransform: 'uppercase'
            }}
            size={12}
            bold={focused ? true : false}
            color={focused ? nowTheme.COLORS.PRIMARY : 'black'}
          >
            {title}
          </Text>
        </Block>
      </Block>
    </TouchableOpacity>
  );
};

export default DrawerItem;


const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: 'white',
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: 'white',
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
  },
});
