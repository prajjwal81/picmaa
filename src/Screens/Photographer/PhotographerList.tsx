import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  Dimensions,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  getFilterPhotograherList,
  getPhotograherList,
} from '../../API/Photgrapher.Api';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;

const PhotographersList = () => {
  const route = useRoute();
  const item = route?.params?.item;
  const eventName = route?.params?.eventName;

  const navigation = useNavigation();
  const [list, setList] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      // if (item == undefined) {
      let res = await getPhotograherList();
      // console.log(JSON.stringify(res.data, null, 2), 'all');
      setList(res.data);
    };
    //  else {
    // let res = getFilterPhotograherList(item);
    // setList(res?.data);
    // console.log(JSON.stringify(res.data, null, 2), 'filter');
    // }
    // };
    getProfile();
  }, []);

  const renderPhotographer = ({item}: any) => (
    <View style={styles.photographerCard}>
      <View style={{width: '100%'}}>
        <Image source={{uri: item.avatarUrl}} style={styles.profileImage} />
        <View style={styles.photographerInfo}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.photographerName}>{item.name}</Text>
            <Text style={styles.photographerAvailability}>
              ⭐ {item.rating} ( {item?.reviewCount} Reviews)
            </Text>
          </View>
          <Text style={styles.photographerAvailability}>{item?.city}</Text>
        </View>
      </View>

      <Pressable
        style={styles.viewContainer}
        onPress={() => {
          navigation.navigate('PhotographerProfileScreen', {id: item._id});
        }}>
        <Text
          style={{
            color: 'rgba(0, 137, 123, 1)',
            fontSize: 18,
            fontWeight: '600',
          }}>
          View Profile
        </Text>
      </Pressable>
    </View>
  );

  return (
    <>
      {list === undefined ? (
        <View
          style={{justifyContent: 'center', alignItems: 'center', top: '50%'}}>
          <Text>Photographer Not Available</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              {/* import Ionicons from 'react-native-vector-icons/Ionicons'; */}
              <Ionicons
                name="arrow-back"
                size={30}
                color="#fff"
                style={{
                  right: Platform.OS == 'android' ? width / 8 : width / 6,
                }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
              <Entypo
                name="camera"
                size={25}
                color="#FFF"
                style={{top: Platform.OS == 'android' ? 5 : 1}}
              />
              <Text style={styles.headerTitle}>Pix Studio Pro</Text>
            </View>
            <Text style={styles.headerSubtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </Text>
          </View>

          {/* Filter Button
      <TouchableOpacity style={styles.filterButton}>
        <Text style={styles.filterText}>Filter By</Text>
        <Icon name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity> */}

          <Text style={styles.sectionTitle}>Top Rated Photographers</Text>
          <Text style={styles.sectionSubtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </Text>

          <FlatList
            data={list?.photographers}
            keyExtractor={item => item._id}
            renderItem={renderPhotographer}
            contentContainerStyle={styles.list}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  header: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 20,
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? '10%' : '20%',
  },
  headerTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 5,
    fontFamily: 'Sansation-Bold',
    marginLeft: 15,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '81%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 137, 123, 1)',
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  filterText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#555',
    marginHorizontal: 20,
    marginTop: 5,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: '80%',
  },
  photographerCard: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    height: Dimensions.get('window').height / 2.5,
    marginTop: '5%',
  },
  profileImage: {
    width: '100%',
    height: '70%',
    borderRadius: 25,
    marginRight: 10,
    // backgroundColor: 'red',
  },
  photographerInfo: {
    paddingHorizontal: '5%',
  },
  photographerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  photographerAvailability: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },

  viewContainer: {
    padding: 10,
    borderRadius: 10,
    width: '90%',
    paddingVertical: '3%',
    alignItems: 'center',
    borderColor: 'rgba(0, 137, 123, 1)',
    borderWidth: 1,
  },
});

export default PhotographersList;
