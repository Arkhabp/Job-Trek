import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/onBoarding/homeScreen';
import AuthNavigation from './AuthNavigation';

const MainNavigation = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('USER_TOKEN');
      setIsLogin(!!userToken); // Set isLogin menjadi true jika userToken ada, false jika tidak
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* {!isLogin ? (
        <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      ) : (
        <> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
      {/* </>
      )} */}
    </Stack.Navigator>
  );
};

export default MainNavigation;
