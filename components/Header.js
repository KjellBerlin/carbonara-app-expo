import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { Block, NavBar, Text, theme } from 'galio-framework';

import Icon from './Icon';
import nowTheme from '../constants/Theme';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

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

class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return back ? navigation.goBack() : navigation.openDrawer();
  };
  renderRight = () => {
    const { white, title, navigation } = this.props;
    // TODO: Navigate to about page
    if (title === 'Title') {
      return [
        <BellButton key="chat-title" navigation={navigation} isWhite={white} />,
      ];
    }

    switch (title) {
      case 'Home':
        return [
          <BellButton key="chat-home" navigation={navigation} isWhite={white} />,
        ];
      case 'Account':
        return [
          <BellButton key="chat-profile" navigation={navigation} />,
        ];
      default:
        break;
    }
  };

  googlePlacesInput = () => {
    return (
      <Block style={{width: width*0.92, height: 55, marginTop: 8}}>
        <GooglePlacesAutocomplete
          placeholder='Where do you live?'
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // TODO: check address with own BE service, if in delivery area
            console.log(data, details);
          }}
          query={{
            key: 'AIzaSyBUNIqACbeX2VTDaUZC_1ZsCSMPL6MK2DI',
            language: 'en',
            components: 'country:de'
          }}
          styles={{
            textInputContainer: {
              borderRadius: 5,
              borderWidth: 0.8,
              borderColor: nowTheme.COLORS.DEFAULT,
            },
            textInput: {
              height: 36,
              color: nowTheme.COLORS.HEADER,
              fontSize: 15,
              fontFamily: 'montserrat-regular',
            },
            listView: {
              position: 'absolute',
              marginTop: 50,
              backgroundColor: 'white',
              zIndex: 1000,
              flexDirection: 'row',
              flexWrap: 'wrap'
            },
          }}
        />
      </Block>
    );
  };

  renderHeyUser = () => {
    return (
      <Block>
        <Text style={styles.hey}>
          HEY KJELL
        </Text>
      </Block>
    )
  }

  renderHeader = () => {
    const { addressSearchHeader, heyHeader, tabs } = this.props;
    if (addressSearchHeader || tabs || heyHeader) {
      return (
        <Block left style={styles.heySearch}>
          {this.renderHeyUser()}
          {addressSearchHeader ? this.googlePlacesInput() : null}
        </Block>
      );
    }
  };
  render() {
    const {
      back,
      title,
      white,
      transparent,
      bgColor,
      iconColor,
      titleColor,
      navigation,
      ...props
    } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null
    ];

    const navbarStyles = [styles.navbar, bgColor && { backgroundColor: bgColor }];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon
              name={back ? 'minimal-left2x' : 'align-left-22x'}
              family="NowExtra"
              size={16}
              onPress={this.handleLeftPress}
              color={iconColor || (white ? nowTheme.COLORS.WHITE : nowTheme.COLORS.ICON)}
            />
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: nowTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'relative',
    paddingLeft: 39
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'next-sphere-thin'
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
    paddingRight: 0
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3
  },
  header: {
    backgroundColor: theme.COLORS.WHITE
  },
  heySearch: {
    marginLeft: 16
  },
  search: {
    height: 48,
    width: width - 32,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: nowTheme.COLORS.BORDER
  },
  hey: {
    lineHeight: 32,
    fontSize: 24,
    fontFamily: 'next-sphere-black',
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
});

export default withNavigation(Header);
