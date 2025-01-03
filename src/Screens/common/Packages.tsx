import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Modal,
} from 'react-native';
import {RazorpayPayment} from '../common/Razorpay';
import {getPhotograherPackage} from './../..//API/Photgrapher.Api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createOrder, updateOrderDetails} from '../../API/Profile.Api';
import FillDetailsScreen from './fillForm.tsx';
import {getItem} from '../../utils/asyncStorage.tsx';

const Packages = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let {id} = route.params || '';
  const [data, setData] = useState([]);

  // let token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ5NWFiOGQwMjlmMzE4ODQxOWZhODgiLCJpYXQiOjE3MzUyODA2MTcsImV4cCI6MTczNTg4NTQxN30.Fhw6tS9Q-2elp52vEgqayeW9PYA3G_-G2fRQPurH_xI';

  useEffect(() => {
    let apiCall = async () => {
      const item = await getItem();
      let res = await getPhotograherPackage(id, item?.accessToken);
      // let res = await getPhotograherPackage(id, token);
      setData(res.data);
    };
    apiCall();
  }, []);

  const renderPackage = ({item}) => (
    <Pressable
      style={styles.packageCard}
      onPress={async () => {
        const item = await getItem();
        let createPackage = await createOrder(item._id, item?.accessToken);
        // let createPackage = await createOrder(item._id, token);
        let razorpay = await RazorpayPayment(createPackage?.data?.amount);
        let updateOrderDetail = await updateOrderDetails(
          createPackage?.transactionId,
          razorpay?.razorpay_payment_id,
          item?.accessToken,
          // token,
        );
        console.log(updateOrderDetail, 'aagay mai');
        // navigation.navigate('');
      }}>
      {item.popular && (
        <View style={styles.popularTag}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <View style={styles.cardHeader}>
        <Text style={styles.packageTitle}>{item?.name}</Text>
        <Text style={styles.packagePrice}>₹ {item?.price}</Text>
      </View>

      <Text style={styles.featureText}>NO OF PHOTOS: {item.photoCount}</Text>
      {/* {item.features.map((feature, index) => (
        <Text key={index} style={styles.featureText}>
          • {feature}
        </Text>
      ))} */}
      <TouchableOpacity
        style={styles.buyButton}
        onPress={async () => {
          await RazorpayPayment(createPackage?.data?.amount);
        }}>
        <Text style={styles.buyButtonText}>Buy Now</Text>
      </TouchableOpacity>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Ionicons
        name="arrow-back"
        size={24}
        color="#000"
        style={styles.backIcon}
        onPress={() => {
          navigation.goBack();
        }}
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderPackage}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: '5%',
  },
  backButton: {
    marginBottom: 10,
    left: '5%',
  },
  backText: {
    fontSize: 40,
    color: 'black',
  },
  listContainer: {
    paddingBottom: 20,
  },
  packageCard: {
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 10,
    paddingHorizontal: '10%',
    paddingVertical: '5%',
    marginBottom: '10%',
    marginHorizontal: '5%',
    backgroundColor: 'rgba(0, 137, 123, 0.2)',
  },
  popularTag: {
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: '#009688',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  popularText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textTransform: 'capitalize',
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009688',
  },
  featureText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
    textTransform: 'capitalize',
  },
  buyButton: {
    marginTop: 10,
    backgroundColor: '#009688',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '50%',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fakeHeight: {
    height: '20%',
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
  },
  backicon: {
    left: '5%',
  },
});

export default Packages;
