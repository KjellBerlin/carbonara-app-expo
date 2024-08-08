import { StyleSheet, Dimensions, ScrollView, Text, RefreshControl } from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../constants';
import OrderStatusCard from '../components/OrderStatusCard';
import usePaidOrders from '../hooks/usePaidOrders';
import { useEffect, useState } from 'react';

const { width } = Dimensions.get('screen');

const OrderStatusScreen = () => {
  const { loading, data, refetch } = usePaidOrders();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Initial fetch on mount
    refetch();

    const interval = setInterval(() => {
      refetch();
    }, 30000); // Refetch every 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [refetch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderCards = () => {
    if (loading) {
      return <Text style={styles.noOrdersText}>Loading</Text>;
    }

    if (data && data.paidOrders && data.paidOrders.length > 0) {
      // Sort the orders by createdAt in descending order
      const sortedOrders = [...data.paidOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return sortedOrders.map((order, index) => {
        const product = order.productDtos[0]; // Always display first product of this order
        return (
          <OrderStatusCard
            key={index}
            product={product}
            orderStatus={order.orderStatus}  // Pass the order status
            deliveryAddress={order.deliveryAddress}  // Pass the delivery address
            createdAt={order.createdAt} // Pass the createdAt
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
