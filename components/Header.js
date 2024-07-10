import React, { useContext } from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Block, NavBar, Text, theme } from 'galio-framework';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import Icon from './Icon';
import nowTheme from '../constants/Theme';
import useServiceAvailability from '../hooks/useServiceAvailability';
import { GlobalContext } from '../GlobalContext';

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

const BellButton = ({ isWhite, style, navigation }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={() => navigation.navigate('Pro')}
  >
    <Icon
      family="NowExtra"
      size={18}
      name="bulb"
      color={nowTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const Header = (props) => {
  const { serviceAvailability, loading, error, handleAddressSelect } = useServiceAvailability();
  const { state } = useContext(GlobalContext);
  const { firstName, googlePlacesAPIKey } = state;

  const handleLeftPress = () => {
    const { back, navigation } = props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };

  const renderRight = () => {
    const { white, title, navigation } = props;
    if (title === 'Title') {
      return [<BellButton key="chat-title" navigation={navigation} isWhite={white} />];
    }
    switch (title) {
      case 'Home':
        return [<BellButton key="chat-home" navigation={navigation} isWhite={white} />];
      case 'Account':
        return [<BellButton key="chat-profile" navigation={navigation} />];
      default:
        break;
    }
  };

  const googlePlacesInput = () => {
    return (
      <Block style={{ width: width * 0.92, height: 43, marginTop: 4, zIndex: 999 }}>
        <GooglePlacesAutocomplete
          placeholder="Where do you live?"
          onPress={handleAddressSelect}
          query={{
            key: googlePlacesAPIKey,
            language: 'en',
            components: 'country:de',
          }}
          styles={{
            container: {
              position: 'absolute',
              zIndex: 999,
              width: '100%',
            },
            textInputContainer: {
              borderRadius: 5,
              borderWidth: 0.8,
              borderColor: nowTheme.COLORS.DEFAULT,
              paddingTop: 4,
              paddingBottom: 4,
              height: 36,
              justifyContent: 'center', // Center the text vertically
            },
            textInput: {
              height: '100%', // Ensure textInput takes the full height of textInputContainer
              color: nowTheme.COLORS.DEFAULT,
              fontSize: 14,
              fontFamily: 'montserrat-regular',
              paddingTop: 0,
              paddingBottom: 0,
            },
            listView: {
              position: 'absolute',
              marginTop: 50,
              backgroundColor: 'white',
              zIndex: 1000,
              flexDirection: 'row',
              flexWrap: 'wrap',
            },
            row: {
              backgroundColor: 'white',
              padding: 13,
              height: 44,
              flexDirection: 'row',
            },
            description: {
              fontFamily: 'montserrat-regular',
              fontSize: 14,
              color: nowTheme.COLORS.DEFAULT,
            },
          }}
        />
      </Block>
    );
  };

  const renderHeyUser = () => {
    return (
      <Block>
        <Text style={styles.hey}>Hey {firstName}</Text>
      </Block>
    );
  };

  const renderServiceAvailability = () => {
    if (loading) return <Text style={styles.serviceText}>Loading...</Text>;
    if (error) return <Text style={styles.serviceText}>Error: {error.message}</Text>;
    if (serviceAvailability) {
      if (serviceAvailability.addressIncomplete) {
        return (
          <Block style={styles.serviceAvailability}>
            <Text style={styles.serviceText}>
              The address is not complete. Please provide a complete address to check delivery availability.
            </Text>
          </Block>
        );
      }
      return (
        <Block style={styles.serviceAvailability}>
          <Text style={styles.serviceText}>
            {serviceAvailability.available
              ? 'We deliver to your location!'
              : 'Unfortunately, we do not deliver to your location yet.'}
          </Text>
        </Block>
      );
    }
    return null;
  };

  const renderHeader = () => {
    const { addressSearchHeader, heyHeader, tabs } = props;
    if (addressSearchHeader || tabs || heyHeader) {
      return (
        <Block left style={styles.heySearch}>
          {renderHeyUser()}
          {addressSearchHeader ? googlePlacesInput() : null}
          {renderServiceAvailability()}
        </Block>
      );
    }
  };

  const {
    back,
    title,
    white,
    transparent,
    bgColor,
    iconColor,
    titleColor,
    navigation,
    ...otherProps
  } = props;

  const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
  const headerStyles = [
    !noShadow ? styles.shadow : null,
    transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
  ];

  const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

  return (
    <Block style={headerStyles}>
      <NavBar
        back={false}
        title={title}
        style={navbarStyles}
        transparent={transparent}
        right={renderRight()}
        rightStyle={{ alignItems: 'center' }}
        left={
          <Icon
            name={back ? 'minimal-left2x' : 'align-left-22x'}
            family="NowExtra"
            size={16}
            onPress={handleLeftPress}
            color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
          />
        }
        leftStyle={{ paddingVertical: 12, flex: 0.2 }}
        titleStyle={[
          styles.title,
          { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
          titleColor && { color: titleColor },
        ]}
        {...otherProps}
      />
      {renderHeader()}
    </Block>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    paddingLeft: 39,
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'next-sphere-thin',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
    paddingRight: 0,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  heySearch: {
    marginLeft: 16,
    zIndex: 1,
    paddingBottom: 4,
  },
  search: {
    height: 48,
    width: width - 32,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER,
  },
  hey: {
    lineHeight: 32,
    fontSize: 24,
    fontFamily: 'next-sphere-black',
    color: nowTheme.COLORS.HEADER,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  serviceAvailability: {
    paddingVertical: 4,
    paddingRight: 12,
    zIndex: 1,
  },
  serviceText: {
    fontFamily: 'montserrat-regular',
    textAlign: 'left',
    padding: 0,
    lineHeight: 14,
    fontSize: 14,
    color: nowTheme.COLORS.DEFAULT, // Set the text color to nowTheme.COLORS.DEFAULT
  },
});

export default withNavigation(Header);
