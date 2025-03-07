import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Pressable,
  Modal,
  Alert,
  SafeAreaView,
  PanResponder,
  BackHandler,
  Platform,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Button from './Button';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {setBucketURL, toggleBottomTab} from '../../../Redux/Global/GlobalSlice';
import FastImage from 'react-native-fast-image';
import ImageZoom from 'react-native-image-pan-zoom';
import {launchImageLibrary} from 'react-native-image-picker';
import AWS from 'aws-sdk';
import RNFS from 'react-native-fs';
import {Buffer} from 'buffer';
import {stat} from 'react-native-fs';
import {ACCESS_KEY_ID, SECRET_KEY_ID} from '@env';
import {getItem} from '../../../src/utils/asyncStorage';
import {
  getSelectedImages,
  postSelectedImages,
} from '../../../src/API/Explore.Api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImageResizer from 'react-native-image-resizer';
import {MultipleImagesSkeleton} from './Skeleton';
import Share from '../../Images/svg/share.svg';

const width = Dimensions.get('window').width;
console.log(ACCESS_KEY_ID, SECRET_KEY_ID);

const Photos = () => {
  // let token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ5NWFiOGQwMjlmMzE4ODQxOWZhODgiLCJpYXQiOjE3MzUyODA2MTcsImV4cCI6MTczNTg4NTQxN30.Fhw6tS9Q-2elp52vEgqayeW9PYA3G_-G2fRQPurH_xI';

  const [selectedImages, setSelectedImages] = useState(new Set());
  const route = useRoute();
  const {subEvent, type, eventId} = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [imageModal, setImageModal] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false); // Track zoom state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [matchedImages, setMatchedImages] = useState([]);
  const [shareModal, setShareModal] = useState(false);
  const [shareNumber, setShareNumber] = useState('');
  const bucketURL = useSelector(state => state?.global?.bucketURL);
  const removeBottomTab = useSelector(state => state?.global?.removeBottomTab);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  useFocusEffect(
    useCallback(() => {
      if (removeBottomTab) {
        dispatch(toggleBottomTab(false));
      }

      return () => {
        if (!removeBottomTab) {
          dispatch(toggleBottomTab(true));
        }
      };
    }, [dispatch, removeBottomTab]),
  );

  useEffect(() => {
    type === 'my' ? compareImageWithS3() : fetchAllImagesFromS3();
    const apiCall = async () => {
      const item = await getItem();
      let images = await getSelectedImages(eventId, item?.accessToken);
      // let images = await getSelectedImages(eventId, token);

      images.selectedPhotos.map(item => {
        selectedImages.add(item.s3Path);
      });
    };
    apiCall();
  }, []);

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
            // setSelectedImageIndex(index);
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
              source={{uri: item?.url}}
              style={styles.fullCategoryImage}
            />
          </ImageZoom>
        </Pressable>
      </SafeAreaView>
    );
  };

  const renderCategory = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.categoryContainer}
        onPress={() => {
          setImageModal(true);
        }}>
        <View style={styles.categoryImage}>
          <FastImage
            resizeMode="cover"
            source={{uri: item?.url}}
            style={styles.categoryImage}
          />
          <Pressable
            style={[styles.heart]}
            onPress={() => {
              // selectedImagesHandler(item?.url, item?.id);
              selectedImagesHandler(item);
            }}>
            <Entypo
              name={'heart'}
              size={16}
              color={
                selectedImages.has(item.url.split('?')[0]) ? 'red' : 'grey'
              }
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
              data={matchedImages}
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

  const selectedImagesHandler = uri => {
    let Images = new Set(selectedImages);
    if (Images.has(uri.url.split('?')[0])) {
      Images.delete(uri.url.split('?')[0]);
    } else {
      Images.add(uri.url.split('?')[0]);
    }
    setSelectedImages(Images);
  };

  let submitHandler = async () => {
    const item = await getItem();
    postSelectedImages([...selectedImages], eventId, item?.accessToken);
    // postSelectedImages([...selectedImages], eventId, token);
  };

  const shareHandler = () => {};

  // .......................................s3.......................................
  // Rekognition Config
  const rekognition = new AWS.Rekognition({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY_ID,
    region: 'ap-south-1',
  });

  // S3 Config
  const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY_ID,
    secretAccessKey: SECRET_KEY_ID,
    region: 'ap-south-1',
  });
  const validateImageSize = async uri => {
    try {
      const stats = await RNFS.stat(uri.replace('file://', '')); // Ensure correct URI format
      if (stats.size > 15 * 1024 * 1024) {
        // Limit: 15MB
        throw new Error('Image size exceeds 15MB');
      }
    } catch (error) {
      console.error('Error validating image size:', error.message);
      throw new Error('Failed to validate image size');
    }
  };

  const convertBlobToBytes = async uri => {
    try {
      const fileBase64 = await RNFS.readFile(uri, 'base64');
      console.log(Buffer.from(fileBase64, 'base64'));
      return Buffer.from(fileBase64, 'base64');
    } catch (error) {
      console.error('Error converting image to bytes:', error.message);
      throw new Error('Failed to convert image to bytes');
    }
  };

  const downloadImageFromS3 = async () => {
    try {
      let user = await getItem();
      let imageUrl = user?.face;

      if (!imageUrl) {
        throw new Error('No image URL found for the user.');
      }

      const localFilePath = RNFS.DocumentDirectoryPath + '/downloadedImage.jpg';

      const downloadResult = await RNFS.downloadFile({
        fromUrl: imageUrl,
        toFile: localFilePath,
      }).promise;

      console.log('Download Result:', downloadResult);
      console.log('Image downloaded to:', localFilePath);

      if (downloadResult?.statusCode !== 200) {
        throw new Error(
          `Failed to download image. Status code: ${downloadResult?.statusCode}`,
        );
      }

      return localFilePath;
    } catch (error) {
      console.error('Error downloading image:', error.message);
      throw new Error('Failed to download image from S3');
    }
  };

  const resizeImage = async uri => {
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      800,
      600,
      'JPEG',
      80,
    );
    return resizedImage.uri;
  };

  // Function to compare the downloaded image with S3 images
  const compareImageWithS3 = async () => {
    setLoading(true);
    setMessage('Comparing...');

    try {
      const localImagePath = await downloadImageFromS3();
      await validateImageSize(localImagePath);

      const resizedUri = await resizeImage(localImagePath);

      const bytes = await convertBlobToBytes(resizedUri);

      console.log('Fetching image list from S3...');
      const listParams = {
        Bucket: 'wedding',
        Prefix: `${bucketURL}${subEvent}`,
      };
      const objects = await s3.listObjectsV2(listParams).promise();
      console.log('🚀 ~ compareImageDirectly ~ objects:', objects);

      const imageNames = objects?.Contents?.map(item => item.Key).filter(name =>
        name.match(/\.(jpg|jpeg|png)$/i),
      );

      console.log('Valid image names:', JSON.stringify(imageNames, null, 2));

      const matchedImages = [];
      for (const imageName of imageNames) {
        console.log(`Comparing with ${imageName}...`);

        const compareParams = {
          SourceImage: {Bytes: bytes},
          TargetImage: {
            S3Object: {
              Bucket: 'wedding',
              Name: imageName,
            },
          },
          SimilarityThreshold: 80,
        };

        try {
          const result = await rekognition
            .compareFaces(compareParams)
            .promise();
          if (result.FaceMatches?.length > 0) {
            const url = s3.getSignedUrl('getObject', {
              Bucket: 'wedding',
              Key: imageName,
              Expires: 3600,
            });
            matchedImages.push({
              imageName,
              similarity: result.FaceMatches[0].Similarity,
              url,
            });
          }
        } catch (error) {
          console.error(`Error comparing with ${imageName}:`, error.message);
        }
      }

      if (matchedImages.length > 0) {
        console.log('Matched Images:', JSON.stringify(matchedImages, null, 2));
        setMatchedImages(matchedImages);
        setMessage('Matches found!');
      } else {
        console.log('No matches found.');
        setMessage('No matches found.');
      }
    } catch (error) {
      console.error('Error during comparison:', error.message);
      setMessage(`Comparison failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllImagesFromS3 = async () => {
    setLoading(true);
    setMessage('Fetching images from S3...');

    try {
      const listParams = {
        Bucket: 'wedding',
        Prefix: `${bucketURL}${subEvent}`,
      };

      const objects = await s3.listObjectsV2(listParams).promise();
      // console.log(
      //   '🚀 ~ fetchAllImagesFromS3 ~ objects:',
      //   JSON.stringify(objects, null, 2),
      // );

      if (!objects.Contents || objects.Contents.length === 0) {
        setMessage('No images found in the specified S3 bucket and prefix.');
        setLoading(false);
        return;
      }

      const imageNames = objects.Contents.map(item => item.Key).filter(name =>
        name.match(/\.(jpg|jpeg|png)$/i),
      );

      // console.log('Valid image names:', imageNames);

      if (imageNames.length === 0) {
        setMessage('No valid image files found under the specified prefix.');
        setLoading(false);
        return;
      }

      const imageUrls = imageNames.map(imageName => {
        const url = s3.getSignedUrl('getObject', {
          Bucket: 'wedding',
          Key: imageName,
          Expires: 3600,
        });
        return {imageName, url};
      });
      setMatchedImages(imageUrls);
      setMessage('Images fetched successfully!');
    } catch (error) {
      console.error('Error fetching images from S3:', error.message);
      setMessage(`Failed to fetch images: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <View style={{padding: '5%', paddingTop: '15%'}}>
          <MultipleImagesSkeleton />
          <MultipleImagesSkeleton />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
          </View>

          <View style={styles.content}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={styles.mainTitle}>{type} Photos</Text>
              <Pressable
                style={styles.btnContainer}
                onPress={() => {
                  setShareModal(true);
                }}>
                <Share />
                <Text style={styles.btnText}>Share </Text>
              </Pressable>
            </View>

            <FlatList
              data={matchedImages}
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
                display: selectedImages.keys === 0 ? 'none' : 'flex',
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={shareModal}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              // ReportModalHandler();
            }}>
            <Pressable
              style={[
                styles.modalContainer,
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0,0,0,0.8)',
                },
              ]}
              onPress={() => {
                setShareModal(false);
              }}>
              <AntDesign
                name="closecircle"
                size={35}
                color="white"
                style={{position: 'absolute', top: 70, right: 30}}
                onPress={() => {
                  setShareModal(false);
                }}
              />

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  padding: 20,
                  borderRadius: 10,
                }}>
                <Text style={{left: '2%', bottom: 5, fontSize: 15}}>
                  Enter the Number
                </Text>

                <TextInput
                  placeholder="Your Number"
                  placeholderTextColor={'black'}
                  style={{
                    width: '100%',
                    height: 60,
                    backgroundColor: 'rgba(233, 233, 233, 1)',
                    borderRadius: 10,
                    paddingLeft: '5%',
                  }}
                  value={shareNumber}
                  onChangeText={setShareNumber}
                />

                <View style={{height: 50, marginTop: '5%'}}>
                  <Button
                    height={'100%'}
                    text={'Submit'}
                    width={'100%'}
                    press={() => {
                      shareHandler();
                    }}
                  />
                </View>
              </View>
            </Pressable>
          </Modal>
        </View>
      )}
    </>
  );
};

export default Photos;

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
    textTransform: 'capitalize',
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
    left: Platform.OS === 'android' ? '54%' : '62%',
    top: Platform.OS === 'android' ? '65%' : '70%',
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
