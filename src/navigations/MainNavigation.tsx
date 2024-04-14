import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/onBoarding/HomeScreen';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import DetailApplicationScreen from '../screens/onBoarding/DetailApplication';

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
    <Stack.Navigator screenOptions={{}}>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="DetailApp" component={DetailApplicationScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
