import React, { useContext } from 'react';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import { Linking } from 'react-native';
import { GlobalContext } from '../GlobalContext';

const { width } = Dimensions.get('screen');

const AccountScreen = () => {
  const { state } = useContext(GlobalContext);

  const handleEmailPress = () => {
    const email = 'user@carbonara-app.com';
    const subject = 'Support Request';
    const body = `User ID: ${state.auth0UserId}`;
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    Linking.openURL(url);
  };

  const getDisplayValue = (value) => {
    return value ? value : 'N/A';
  };

  const renderContent = () => {
    return (
      <Block flex space="between" style={styles.cardDescription}>
        <Block flex style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsHeading} color={nowTheme.COLORS.HEADER}>
            Name
          </Text>
          <Text style={styles.userDetail} color={nowTheme.COLORS.HEADER}>
            {getDisplayValue(state.fullName)}
          </Text>
          <Text style={styles.userDetailsHeading} color={nowTheme.COLORS.HEADER}>
            E Mail
          </Text>
          <Text style={styles.userDetail} color={nowTheme.COLORS.HEADER}>
            {getDisplayValue(state.email)}
          </Text>
          <Text style={styles.userDetailsHeading} color={nowTheme.COLORS.HEADER}>
            Phone number
          </Text>
          <Text style={styles.userDetail} color={nowTheme.COLORS.HEADER}>
            {getDisplayValue(state.phoneNumber)}
          </Text>
          <Text style={styles.userDetailsHeading} color={nowTheme.COLORS.HEADER}>
            User Id
          </Text>
          <Text style={styles.userDetail} color={nowTheme.COLORS.HEADER}>
            {getDisplayValue(state.auth0UserId)}
          </Text>
        </Block>
        <Block flex style={styles.explanationContainer}>
          <Text style={styles.explanation} color={nowTheme.COLORS.HEADER}>
            If you wish to update your user details or delete your account, please contact our support team and include your user ID in the message.
          </Text>
          <TouchableOpacity onPress={handleEmailPress}>
            <Text style={styles.email} color={nowTheme.COLORS.HEADER}>
              user@carbonara-app.com
            </Text>
          </TouchableOpacity>
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
    paddingLeft: theme.SIZES.BASE / 2,
    paddingRight: theme.SIZES.BASE / 2,
  },
  userDetailsHeading: {
    fontFamily: 'next-sphere-black',
    fontSize: 18,
    marginBottom: theme.SIZES.BASE / 2,
    marginTop: theme.SIZES.BASE * 2,
  },
  userDetailsContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  userDetail: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
    marginTop: 5,
    color: nowTheme.COLORS.DEFAULT,
  },
  explanationContainer: {
    marginTop: 50,
    marginLeft: 10,
    marginRight: 10,
  },
  explanation: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
    color: nowTheme.COLORS.DEFAULT,
  },
  email: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    lineHeight: 14,
    color: nowTheme.COLORS.INFO,
    marginTop: 15,
  },
});

export default AccountScreen;
