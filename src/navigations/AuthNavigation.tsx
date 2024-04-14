import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignIn from '../screens/auth/signInScreen';
import SignUp from '../screens/auth/signUpScreen';
import HomeScreen from '../screens/onBoarding/HomeScreen';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
