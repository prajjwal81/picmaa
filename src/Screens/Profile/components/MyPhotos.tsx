import {
  Alert,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  deleteSelectedImages,
  getSelectedImages,
  postSelectedImages,
} from '../../../API/Explore.Api';
import Button from '../../../Screens/common/Button';
import FastImage from 'react-native-fast-image';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import ImageZoom from 'react-native-image-pan-zoom';
import {toggleBottomTab} from '../../../../Redux/Global/GlobalSlice';
import {useDispatch} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width;
export default function MyPhotos() {
  let token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ5NWFiOGQwMjlmMzE4ODQxOWZhODgiLCJpYXQiOjE3MzUyODA2MTcsImV4cCI6MTczNTg4NTQxN30.Fhw6tS9Q-2elp52vEgqayeW9PYA3G_-G2fRQPurH_xI';
  const route = useRoute();
  const dispatch = useDispatch();
  const {sublistItem} = route.params;
  const [image, setImage] = useState([]);
  const [deselectedImage, setDeselectedImage] = useState(new Set());
  const [zoomScale, setZoomScale] = useState(1);
  const [imageModal, setImageModal] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useFocusEffect(() => {
    dispatch(toggleBottomTab(false));
  });

  const selectedImagesHandler = uri => {
    const newDeselectedImage = new Set(deselectedImage);
    if (newDeselectedImage.has(uri)) {
      newDeselectedImage.delete(uri);
    } else {
      newDeselectedImage.add(uri);
    }
    setDeselectedImage(newDeselectedImage);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        let newZoomScale = zoomScale + gestureState.dy * 0.001;
        newZoomScale = Math.max(1, newZoomScale); // Ensure the scale is not less than 1
        setZoomScale(newZoomScale);
      },
    }),
  );
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderfullImage = ({item}) => {
    return (
      <SafeAreaView
        style={[
          styles.modalContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <AntDesign
          name="closecircle"
          size={35}
          color="grey"
          style={{position: 'absolute', top: 70, right: 30, zIndex: 10}}
          onPress={() => {
            setImageModal(false);
          }}
        />
        <Pressable
          style={styles.imageContainer}
          activeOpacity={1}
          {...panResponder.panHandlers}>
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height / 2.7}
            panToMove
            pinchToZoom
            enableSwipeDown
            useNativeDriver
            onMove={position => {
              if (position.scale > 1) {
                setIsZoomed(true);
              } else {
                setIsZoomed(false);
              }
            }}>
            <FastImage
              resizeMode="cover"
              source={{uri: item?.s3Path}}
              style={styles.fullCategoryImage}
            />
          </ImageZoom>
        </Pressable>
      </SafeAreaView>
    );
  };

  let submitHandler = () => {
    deleteSelectedImages([...deselectedImage], sublistItem._id, token);
  };

  useEffect(() => {
    const apiCall = async () => {
      let images = await getSelectedImages(sublistItem._id, token);
      setImage(images.selectedPhotos);
    };
    apiCall();
  }, []);
  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => {
          setImageModal(true);
          setSelectedImageIndex(index);
        }}>
        <View style={styles.categoryImage}>
          <FastImage
            resizeMode="cover"
            source={{uri: item.s3Path}}
            style={styles.categoryImage}
          />
          <Pressable
            style={[styles.heart]}
            onPress={() => {
              selectedImagesHandler(item.s3Path);
            }}>
            <Entypo
              name={'heart'}
              size={16}
              color={deselectedImage.has(item.s3Path) ? 'grey' : 'red'}
            />
          </Pressable>
        </View>
        {/* <Text style={styles.categoryText}>{item?.title}</Text> */}

        <Modal
          animationType="slide"
          transparent={true}
          visible={imageModal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            // ReportModalHandler();
          }}>
          <SafeAreaView
            style={[
              styles.modalContainer,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <AntDesign
              name="closecircle"
              size={35}
              color="grey"
              style={{position: 'absolute', top: 70, right: 30}}
              onPress={() => {
                setImageModal(false);
              }}
            />
            <FlatList
              pagingEnabled
              horizontal
              data={image}
              renderItem={renderfullImage}
              keyExtractor={keyExtractor}
              initialScrollIndex={selectedImageIndex} // Set the initial index here
              getItemLayout={(data, index) => ({
                length: width,
                offset: width * index,
                index,
              })}
              scrollEnabled={!isZoomed} // Disable scrolling when image is zoomed
            />
          </SafeAreaView>
        </Modal>
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
            style={{right: Dimensions.get('window').width / 6}}
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
      </View>

      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.mainTitle}>All Photos</Text>
          {/* <View style={styles.btnContainer}>
            <Share />
            <Text style={styles.btnText}>Share </Text>
          </View> */}
        </View>

        <FlatList
          data={image}
          renderItem={renderCategory}
          // keyExtractor={item => item.id.toString()}
          numColumns={3}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: '92%',
        }}>
        <View
          style={{
            display: deselectedImage.size == 0 ? 'none' : 'flex',
            height: '100%',
          }}>
          <Button
            height={'5%'}
            text={'Submit'}
            width={'90%'}
            press={() => {
              submitHandler();
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    fontSize: 35,
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
    // flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },

  categoryImage: {
    width: Dimensions.get('window').width / 3.7,
    height: Dimensions.get('window').height / 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  fullCategoryImage: {
    width: Dimensions.get('window').width,
    height: '100%',
    borderRadius: 10,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
  btnContainer: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
    marginLeft: 10,
  },
  heart: {
    position: 'absolute',
    zIndex: 2,
    left: '62%',
    top: '70%',
    // backgroundColor: '#D9D9D9',
    backgroundColor: '#D9D9D9',
    padding: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartContainer: {
    // color: '#D9D9D9',
  },
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '5%',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
