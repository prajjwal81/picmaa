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
import Button from '../../common/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getEvent, getEventList} from '../../../API/Explore.Api';
import {getItem} from '../../../utils/asyncStorage';
import {useDispatch, useSelector} from 'react-redux';
import {
  setBucketURL,
  setProfilePhoto,
} from '../../../../Redux/Global/GlobalSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
const YourAlbum = () => {
  const [modal, setModal] = useState(false);
  const [subEvent, setSubEvent] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  let {sublistItem} = route.params;
  const dispatch = useDispatch();
  const bucketURL = useSelector(state => state?.global?.bucketURL);
  // console.log('🚀 ~ YourAlbum ~ bucketURL:', bucketURL);

  const renderCategory = ({item}) => {
    const modalHandler = () => {
      setSubEvent(item?.eventName);
      setModal(true);
    };
    return (
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => {
          modalHandler(item);
        }}>
        <Image
          source={{uri: item?.photos[0].s3Path}}
          style={styles.categoryImage}
          resizeMode="cover"
        />
        <Text style={styles.categoryText}>{item?.eventName}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="#fff"
            style={{right: Platform.OS == 'android' ? width / 8 : width / 6}}
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

      <View style={styles.content}>
        <Text style={styles.mainTitle}>Your Events</Text>
        <Text style={styles.mainSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>

        <FlatList
          data={sublistItem?.photos}
          renderItem={renderCategory}
          // keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
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
                navigation.navigate('Photos', {
                  subEvent: subEvent,
                  type: 'my',
                  eventId: sublistItem?._id,
                });
              }}
              height={'15%'}
              width={'80%'}
            />
            <View style={{marginVertical: '3%'}} />
            <Button
              text={'All Photos'}
              press={() => {
                setModal(false);
                navigation.navigate('Photos', {
                  subEvent: subEvent,
                  type: 'all',
                  eventId: sublistItem?._id,
                });
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

export default YourAlbum;

const styles = StyleSheet.create({
  container: {
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
  grid: {
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: 'white',
  },
  categoryContainer2: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: Dimensions.get('window').height / 4.9,
    borderRadius: 10,
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
