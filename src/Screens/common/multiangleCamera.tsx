import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  Pressable,
  Dimensions,
} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {setProfilePhoto} from '../../../Redux/Global/GlobalSlice';
import {useNavigation} from '@react-navigation/native';
import {updateFace} from '../../../src/API/Auth.Api';
import {setItem, getItem} from '../../../src/utils/asyncStorage';
import RNFS from 'react-native-fs';

const MultiAngleCapture = () => {
  const devices = useCameraDevices();
  const device = devices.back || devices.find(d => d.position === 'back');
  const cameraRef = useRef<Camera>(null);
  const [photos, setPhotos] = useState({front: '', left: '', right: ''});
  const [btnClicked, setBtnClicked] = useState(false);
  const [angles, setAngles] = useState('');
  // const [localItem, setLocalItem] = useState();
  // console.log('🚀 ~ MultiAngleCapture ~ localItem:', localItem);
  const dispatch = useDispatch();
  const profilePhoto = useSelector(state => state?.global?.profilePhoto);
  const navigation = useNavigation();

  // let token =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzQ5NWFiOGQwMjlmMzE4ODQxOWZhODgiLCJpYXQiOjE3MzUyODA2MTcsImV4cCI6MTczNTg4NTQxN30.Fhw6tS9Q-2elp52vEgqayeW9PYA3G_-G2fRQPurH_xI';

  useEffect(() => {
    const requestPermissions = async () => {
      await Camera.requestCameraPermission();
    };
    requestPermissions();
  }, []);

  // const savePhotoToStorage = async photoPath => {
  //   try {
  //     const directoryPath = RNFS.DocumentDirectoryPath + '/photos';
  //     await RNFS.mkdir(directoryPath);

  //     const destinationPath = `${directoryPath}/photo_${new Date().getTime()}.jpg`;
  //     await RNFS.moveFile(photoPath, destinationPath);
  //     console.log('Photo saved to:', destinationPath);
  //     let res = getItem();
  //     await setItem({...res, face: destinationPath});
  //     return destinationPath; // Return the saved path
  //   } catch (error) {
  //     console.error('Error saving photo to storage:', error);
  //   }
  // };

  const uploadPhoto = async photoPath => {
    const formData = new FormData();
    if (angles === 'front' && photo.path) {
      const fullPath = photo.path.startsWith('file://')
        ? photo.path
        : `file://${photo.path}`;
      uploadPhoto(fullPath); // Directly pass fullPath here
    }

    const file = {
      uri: photoPath.startsWith('file://') ? photoPath : `file://${photoPath}`,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    formData.append('faceId', file);
    const item = await getItem();
    // const getEventLists = await getEventList(item?.accessToken);

    // updateFace(formData, token);
    updateFace(formData, item?.accessToken);
  };

  const getNextAngle = () => {
    return ['front', 'left', 'right'].find(angle => photos[angle] === '');
  };

  const deletePhoto = angle => {
    setPhotos(prev => ({...prev, [angle]: ''}));
    setBtnClicked(false);
  };

  const takePhoto = async angle => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePhoto({flash: 'off'});
        setPhotos(prev => ({...prev, [angle]: photo.path}));
        setBtnClicked(true);

        if (angle === 'front' && photo.path) {
          const fullPath = photo.path.startsWith('file://')
            ? photo.path
            : `file://${photo.path}`;
          // const savedPath = await savePhotoToStorage(fullPath);
          // const res = await getItem();
          // setItem({...res, face: savedPath});
          await uploadPhoto(fullPath);
        }
      } catch (error) {
        console.error('Error taking photo:', error);
      }
    }
  };

  const renderPhoto = () => {
    const currentAngle = ['front', 'left', 'right'].find(
      angle => photos[angle],
    );
    if (!currentAngle) return null;

    return (
      <View>
        <Image
          source={require('../../Images/scan.png')}
          style={{
            height: '105%',
            width: '100%',
            position: 'absolute',
            zIndex: 2,
          }}
        />
        <Image
          source={{uri: 'file://' + photos[currentAngle]}}
          style={styles.image}
        />
        <View style={styles.actions}>
          <Pressable
            onPress={() => deletePhoto(currentAngle)}
            style={{zIndex: 10, left: '10%'}}>
            <Icon name="circle-with-cross" size={40} color="grey" />
          </Pressable>
          <Pressable
            style={{zIndex: 10, left: Dimensions.get('window').width / 1.3}}
            onPress={() => {
              const nextAngle = getNextAngle();
              if (nextAngle) {
                setBtnClicked(false);
              }
              if (angles == 'front') {
                // setItem()
                dispatch(setProfilePhoto(photos['front']));
              }
              if (angles === 'right') {
                navigation.navigate('BottomTabs');
              }
            }}>
            <AntDesign name="checkcircle" size={40} color="grey" />
          </Pressable>
        </View>
      </View>
    );
  };

  const renderCaptureButton = () => {
    const nextAngle = getNextAngle();
    if (!nextAngle) return null;

    return (
      <Button
        title={`Capture ${
          nextAngle.charAt(0).toUpperCase() + nextAngle.slice(1)
        }`}
        onPress={() => {
          setAngles(nextAngle);
          takePhoto(nextAngle);
        }}
      />
    );
  };

  if (!device)
    return (
      <View style={styles.loading}>
        <Text>Loading Camera...</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {btnClicked ? (
        renderPhoto()
      ) : (
        <>
          {/* <Image
            source={require('../../Images/scan.png')}
            style={{
              height: '95%',
              width: '100%',
              position: 'absolute',
              zIndex: 2,
            }}
          /> */}
          <View style={{zIndex: 1, height: '90%'}}>
            <Camera
              style={styles.camera}
              device={device}
              isActive={true}
              photo={true}
              ref={cameraRef}
            />
          </View>
          <View style={styles.controls}>{renderCaptureButton()}</View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  camera: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0.5,
    width: '100%',
    height: '9%',
    backgroundColor: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '95%',
    // resizeMode: 'contain',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    position: 'absolute',
  },
});

export default MultiAngleCapture;
