import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/Home';
import PhotographersList from '../Screens/Photographer/PhotographerList';
import PhotographerProfile from '../Screens/Photographer/components/photoGrapherProfile';
import MultiAngleCapture from '../Screens/common/multiangleCamera';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PhotographersList" component={PhotographersList} />
      <Stack.Screen
        name="PhotographerProfileScreen"
        component={PhotographerProfile}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
