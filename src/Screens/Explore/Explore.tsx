import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Photos from '../common/Photos';
import YourAlbum from './components/YourAlbum';
import AlbumCategory from './components/AlbumCategory';

const Explore = () => {
  return (
    <View>
      {/* <Photos /> */}
      {/* <YourAlbum /> */}
      <AlbumCategory />
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({});
