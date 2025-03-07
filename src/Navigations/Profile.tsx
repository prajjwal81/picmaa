import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from '../Screens/Profile/components/Profile';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import Question from '../Screens/Profile/components/Faq';
import AccountDeletedScreen from '../Screens/Profile/components/deleteAccount';
import FillDetailsScreen from '../Screens/common/fillForm';
import MyPhotos from '../Screens/Profile/components/MyPhotos';
import AlbumCategory from '../Screens/Explore/components/AlbumCategory';
import TypeOfPackages from '../Screens/Profile/components/typeOfPackages';
import Login from '../Screens/Auth/login';
import SharedNumbers from '../Screens/Profile/components/sharedNumbers';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen
        name="AccountDeletedScreen"
        component={AccountDeletedScreen}
      />
      <Stack.Screen name="Question" component={Question} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="MyPhotos" component={MyPhotos} />
      <Stack.Screen name="AlbumCategory" component={AlbumCategory} />
      <Stack.Screen name="TypeOfPackages" component={TypeOfPackages} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SharedNumbers" component={SharedNumbers} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
