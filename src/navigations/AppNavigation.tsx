import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AuthNavigation from './AuthNavigation';
import Colors from '../constans/colors';
import MainNavigation from './MainNavigation';

import {RootState} from '../store';

const AppNavigation = () => {
  const Stack = createNativeStackNavigator();
  const user = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, [user]);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('USER_TOKEN');
      if (userToken) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      {!isLogin ? <AuthNavigation /> : <MainNavigation />}
    </NavigationContainer>
  );
};

export default AppNavigation;
