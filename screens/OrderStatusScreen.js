import { StyleSheet, Dimensions, ScrollView, Text } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderStatusCard from '../components/OrderStatusCard';
import usePaidOrders from '../hooks/usePaidOrders';
import { useEffect } from 'react';

const { width } = Dimensions.get('screen');

const OrderStatusScreen = () => {
  const { loading, data, refetch } = usePaidOrders();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000); // Refetch every 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [refetch]);

  const renderCards = () => {
    if (loading) {
      return <Text style={styles.noOrdersText}>Loading</Text>
    }

    if (data.paidOrders && data.paidOrders.length > 0) {
      return data.paidOrders.map((order, index) => {
        const product = order.productDtos[0]; // Always display first product of this order
        return (
          <OrderStatusCard
            key={index}
            product={product}
            orderStatus={order.orderStatus}  // Pass the order status
            deliveryAddress={order.deliveryAddress}  // Pass the delivery address
            full
            titleStyle={styles.productTitle}
            imageStyle={{ height: 300, width: '100%', resizeMode: 'cover' }}
          />
        );
      });
    }

    return (
      <Block>
        <Text style={styles.noOrdersText}>No orders yet.</Text>
      </Block>
    );
  };

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
  noOrdersText: {
    fontFamily: 'next-sphere-black',
    color: nowTheme.COLORS.DEFAULT,
    textAlign: 'center',
    fontSize: 12,
    marginTop: 25,
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

export default OrderStatusScreen;
