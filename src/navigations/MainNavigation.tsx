import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HomeScreen from '../screens/onBoarding/HomeScreen';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import DetailApplicationScreen from '../screens/onBoarding/DetailApplication';
import {fonts} from '../helpers/fonst';
import {Alert, Button, Touchable} from 'react-native';
import Icons from '../components/icon';
import Colors from '../constans/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="TabNavigation"
        component={TabNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailApp"
        component={DetailApplicationScreen}
        options={{
          title: 'Detail',
          // headerTitleStyle: {fontFamily: fonts.SemiBold},
          statusBarStyle: 'dark',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => Alert.alert('Archive')}
              activeOpacity={0.8}>
              <Icons name="Archive" color={Colors.blue} size={20} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
