import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../common/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getEvent, getEventList} from '../../../API/Explore.Api';
import {getItem} from '../../../utils/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {setBucketURL} from '../../.././../Redux/Global/GlobalSlice';

const AlbumCategory = () => {
  const route = useRoute();
  const {screen} = route?.params || '';
  console.log('🚀 ~ AlbumCategory ~ screen:', screen);
  const [modal, setModal] = useState(false);
  const navigation = useNavigation();
  const [sublistItem, setSubListItem] = useState([]);
  const dispatch = useDispatch();
  const bucketURL = useSelector(state => state?.global?.bucketURL);

  // let token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ5NWFiOGQwMjlmMzE4ODQxOWZhODgiLCJpYXQiOjE3MzUyODA2MTcsImV4cCI6MTczNTg4NTQxN30.Fhw6tS9Q-2elp52vEgqayeW9PYA3G_-G2fRQPurH_xI';

  useEffect(() => {
    const getEvents = async () => {
      const item = await getItem();
      const getEventLists = await getEventList(item?.accessToken);
      // const getEventLists = await getEventList(token);
      setSubListItem(getEventLists?.data);
    };
    getEvents();
  }, []);

  const pressHandler = async item => {
    // console.log('🚀 ~ pressHandler ~ item:', JSON.stringify(item, null, 2));
    dispatch(
      setBucketURL(
        `${item?.photographerId?.mobile}/${item?.userId?.mobile}/${item?.name}/`,
      ),
    );
    {
      screen == 'profile'
        ? navigation.navigate('MyPhotos', {sublistItem: item})
        : navigation.navigate('YourAlbum', {sublistItem: item});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          {screen == 'profile' ? (
            <Ionicons
              name="arrow-back"
              size={30}
              color="#fff"
              style={{right: Dimensions.get('window').width / 6}}
              onPress={() => {
                navigation.goBack();
              }}
            />
          ) : (
            ''
          )}
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

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Your Albums</Text>
        <Text style={styles.mainSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>

        {sublistItem !== undefined &&
          sublistItem?.map((item, idx) => {
            return (
              <TouchableOpacity
                key={idx}
                style={styles.categoryContainer}
                onPress={() => pressHandler(item)}>
                <Text style={styles.categoryText}>{item?.name}</Text>
              </TouchableOpacity>
            );
          })}
      </View>

      <View style={styles.container}>
        <Modal
          visible={modal}
          animationType="slide"
          transparent
          style={{borderWidth: 2}}>
          <Pressable
            style={styles.fakeHeight}
            onPress={() => {
              setModal(false);
            }}
          />
          <View
            style={{
              backgroundColor: 'white',
              alignItems: 'center',
            }}>
            <Text
              style={{marginVertical: '5%', fontSize: 18, fontWeight: '800'}}>
              Select All Your Photos
            </Text>
            <Button
              text={'Your Photos'}
              press={() => {
                setModal(false);
                navigation.navigate('Photos');
              }}
              height={'15%'}
              width={'80%'}
            />
            <View style={{marginVertical: '3%'}} />
            <Button
              text={'All Photos'}
              press={() => {
                setModal(false);
                navigation.navigate('Photos');
              }}
              height={'15%'}
              width={'80%'}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default AlbumCategory;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#FFFFFF',
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
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    letterSpacing: 0.6,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    fontFamily: 'Inter',
  },

  categoryContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },

  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  fakeHeight: {
    height: '70%',
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
  },
});
