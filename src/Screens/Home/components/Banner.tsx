import React from 'react';
import Carousel from 'react-native-banner-carousel-updated';
import {StyleSheet, Image, View, Dimensions} from 'react-native';

const BannerWidth = Dimensions.get('window').width - 20;
const BannerHeight = Dimensions.get('window').height / 3.9;

const images = [
  require('../../../Images/Banner.png'),
  require('../../../Images/Banner.png'),
  require('../../../Images/Banner.png'),
];

const Banner = () => {
  const renderPage = (image, index) => (
    <View key={index}>
      <Image
        style={{
          width: BannerWidth / 1.1 + 30,
          height: '100%',
          borderRadius: 10,
          alignSelf: 'center',
        }}
        source={image}
      />
    </View>
  );

  const CaraouselProps = {
    autoplay: true,
    autoplayTimeout: 5000,
    loop: true,
    index: 0,
    useNativeDriver: true,
    pageSize: Dimensions.get('window').width / 1,
  };

  return (
    <View style={styles.container}>
      <Carousel {...CaraouselProps}>
        {images.map((image, index) => renderPage(image, index))}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center', // Added to center the carousel
    marginTop: '5%',
    height: '22%',
    paddingLeft: '2.5%',
  },
});

export default Banner;
