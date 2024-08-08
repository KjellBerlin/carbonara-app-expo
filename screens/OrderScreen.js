import React, { useContext, useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Linking } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderCard from '../components/OrderCard';
import AddressCard from '../components/AddressCard';
import { GlobalContext } from '../GlobalContext';
import { Button } from '../components';
import useCreateOrder from '../hooks/useCreateOrder';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const { width } = Dimensions.get('screen');

const OrderScreen = () => {
  const { state } = useContext(GlobalContext);
  const { fullName, product, address } = state;
  const [additionalDetailsFocus, setAdditionalDetailsFocus] = useState(false);
  const { data, loading, createOrder } = useCreateOrder();

  const handlePress = async () => {
    if (loading) {
      return;
    }
    try {
      await InAppBrowser.warmup();
      await createOrder();
      if (!loading && data) {
        const { orderId, paymentRedirectionLink } = data.createOrder;
        console.log(`Order: ${orderId} Redirect link: ${paymentRedirectionLink}`);
        if (paymentRedirectionLink) {
          await openInAppBrowser(paymentRedirectionLink);
        }
      }
    } catch (error) {
      console.error('Order creation failed:', error);
    }
  };

  const openInAppBrowser = async (url) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url, {
          dismissButtonStyle: 'cancel',
          animated: true,
          modalPresentationStyle: 'pageSheet',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          toolbarColor: '#6200EE',
          secondaryToolbarColor: 'black',
          forceCloseOnRedirection: true,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
        console.log(result);
      } else {
        await Linking.openURL(url);
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
