import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OTP from '../Screens/Auth/OTP';
import Welcome from '../Screens/Auth/photographerNumber';
import MultiAngleCapture from '../Screens/common/multiangleCamera';
import ConfirmPhotographerScreen from '../Screens/Auth/ConfirmPhotographerScreen';
import Login from '../Screens/Auth/login';
import PhotographerNumber from '../Screens/Auth/photographerNumber';
import BottomTabs from '../Stacks/BottomStack';
import HomeStack from './Home';

const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Stack.Screen name="Welcome" component={Welcome} /> */}

      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="MultiAngleCapture" component={MultiAngleCapture} />
      <Stack.Screen name="Otp" component={OTP} />
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="PhotographerNumber" component={PhotographerNumber} />
      {/* <Stack.Screen name="MultiAngleCapture" component={MultiAngleCapture} /> */}
      <Stack.Screen
        name="ConfirmPhotographerScreen"
        component={ConfirmPhotographerScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
