import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function RenderFullImage() {
  return (
    <SafeAreaView style={styles.modalContent}>
      <MaterialCommunityIcons
        onPress={() => setCarImageModal(false)}
        size={30}
        name="close"
        color="#FFF"
        style={styles.closeIcon}
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
            source={{
              uri: item?.image || 'default_fallback_image_url_if_needed',
              // headers: {Authorization: 'someAuthToken'},
              priority: FastImage.priority.normal,
            }}
            style={{
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height / 2.7,
              transform: [{scale: zoomScale}],
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ImageZoom>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  shadowContainer: {
    backgroundColor: '#FFFFFF', // Set a solid background color
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
    paddingHorizontal: '3%',
    borderEndEndRadius: 30,
    borderEndStartRadius: 30,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallImage: {
    height: 80,
    width: Dimensions.get('window').width / 4.6,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    marginRight: 5,
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Poppins-Bold',
    // fontWeight: '500',
    color: 'black',
  },
  text2: {
    fontSize: 18,
    fontFamily: 'Futura',
    // fontWeight: '400',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  benifitMainContainer: {
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: '2%',
    // paddingHorizontal: '3%',
  },

  benifitContainer: {
    backgroundColor: '#BAD7FF',
    padding: 10,
    borderRadius: 10,
    marginLeft: '25%',
    width: '38%',
  },
  ownerContainer: {
    // paddingRight: '10%',

    width: '100%',
    paddingLeft: '3%',
  },
  sellerDiv: {
    width: '55%',
    height: 25,
    borderRadius: 30,
    borderColor: '#E07A02',
    borderWidth: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: '2%',
    marginVertical: '1%',
  },
  sellerTextDiv: {
    paddingHorizontal: '10%',
  },
  sellerText: {
    fontFamily: 'FUTURA',
    color: 'black',
    fontSize: 25,
    fontWeight: '800',
    // marginTop: '2%',
  },
  emiContainer: {
    // paddingRight: '40%',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: '5%',
    marginTop: '5%',
  },
  emiText: {
    fontFamily: 'Poppins',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: '400',
    marginTop: '3%',
  },
  button: {
    backgroundColor: '#2F88FF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
    padding: 20,
    marginVertical: '7%',
  },
  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  icon: {top: '2%', zIndex: 2, right: '88%', position: 'absolute'},
  modalContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: '5%',
  },
  modalSubContainer: {
    width: '90%',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '8%',
  },

  closeIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : '10%',
    zIndex: 1,
    left: '87%',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalContent: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enquiryModalContainer: {
    borderWidth: 0.5,
    // backgroundColor: '#FFFFFF',
    height: '60%',

    width: Dimensions.get('window').width - 40,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#7C7C7C',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    color: '#000000E5',
    fontSize: 14,
    fontWeight: '400',
  },
});
