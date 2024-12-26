import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Explore from '../Screens/Explore/Explore';
import Photos from '../Screens/common/Photos';
import AlbumCategory from '../Screens/Explore/components/AlbumCategory';
import YourAlbum from '../Screens/Explore/components/YourAlbum';
import MyPhotos from '../Screens/Profile/components/MyPhotos';

const Stack = createNativeStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Explore" component={Explore} />
      <Stack.Screen name="AlbumCategory" component={AlbumCategory} />
      <Stack.Screen name="Photos" component={Photos} />
      <Stack.Screen name="YourAlbum" component={YourAlbum} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
