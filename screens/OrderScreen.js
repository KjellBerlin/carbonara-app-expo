import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, Linking } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import AddressCard from '../components/AddressCard';
import { GlobalContext } from '../GlobalContext';
import { Button } from '../components';
import useCreateOrder from '../hooks/useCreateOrder';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const OrderScreen = () => {
  const navigation = useNavigation();
  const { state } = useContext(GlobalContext);
  const { fullName, product, address } = state;
  const [additionalDetailsFocus, setAdditionalDetailsFocus] = useState(false);
  const { data, loading, createOrder } = useCreateOrder();

  useEffect(() => {
    const handleUrlChange = ({ url }) => {}; // empty function for now

    const subscription = Linking.addEventListener('url', handleUrlChange);

    return () => {
      subscription.remove();  // Clean up the event listener when the component unmounts
    };
  }, []);

  const handlePress = async () => {
    if (loading) {
      return;
    }
    try {
      await createOrder();
      if (!loading && data) {
        const { orderId, paymentRedirectionLink } = data.createOrder;
        console.log(`Order: ${orderId} Redirect link: ${paymentRedirectionLink}`);
        if (paymentRedirectionLink) {
          await openBrowser(paymentRedirectionLink);
        }
      }
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const openBrowser = async (paymentRedirectionLink) => {
    try {
      const result = await WebBrowser.openAuthSessionAsync(paymentRedirectionLink);

      if (result.type === 'success' && result.url) {
        // Manually handle the URL change here if needed
        console.log('Final URL:', result.url, result.type);
        navigation.navigate('Order Status');
      }
    } catch (error) {
      console.error('Failed to open URL:', error.message);
    }
  };

  const renderCards = () => (
    <Block>
      <OrderCard
        product={product}
        full
        titleStyle={styles.productTitle}
        imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
      />
      <AddressCard
        fullName={fullName}
        address={address}
        additionalDetailsFocus={additionalDetailsFocus}
        setAdditionalDetailsFocus={setAdditionalDetailsFocus}
      />
      <Block>
        <Button
          textStyle={styles.buttonText}
          style={styles.button}
          onPress={handlePress}
        >
          Order with obligation to pay
        </Button>
      </Block>
    </Block>
  );

  return (
    <Block flex center style={styles.home}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {renderCards()}
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
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'next-sphere-black',
    fontSize: 18,
  },
  button: {
    marginTop: 60,
    width: width - theme.SIZES.BASE * 2,
    marginLeft: 16,
  },
  buttonText: {
    fontFamily: 'next-sphere-black',
    fontSize: 12,
  },
});

export default OrderScreen;

