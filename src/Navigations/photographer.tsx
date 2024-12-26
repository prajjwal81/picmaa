import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Screens/Home/Home';
import PhotographersList from '../Screens/Photographer/PhotographerList';
import PhotographerProfile from '../Screens/Photographer/components/photoGrapherProfile';
import Packages from '../Screens/common/Packages';

const Stack = createNativeStackNavigator();

const PhotographerStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PhotographersList" component={PhotographersList} />
      <Stack.Screen
        name="PhotographerProfileScreen"
        component={PhotographerProfile}
      />
      <Stack.Screen name="Packages" component={Packages} />
    </Stack.Navigator>
  );
};

export default PhotographerStack;
