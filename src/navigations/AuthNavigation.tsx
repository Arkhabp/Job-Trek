import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../screens/auth/signInScreen';
import SignUp from '../screens/auth/signUpScreen';
import HomeScreen from '../screens/onBoarding/homeScreen';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
