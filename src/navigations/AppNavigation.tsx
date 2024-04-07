import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {RootState} from '../store';
import {loginSuccess} from '../store/redux/action/auth';

import Colors from '../constans/colors';

import AuthNavigation from './AuthNavigation';
import MainNavigation from './MainNavigation';
import SplashScreen from '../screens/splash';

const AppNavigation = () => {
  const token = useSelector((state: RootState) => state?.auth?.signIn?.token);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk memeriksa status autentikasi saat aplikasi dimulai
  const checkAuthStatus = async () => {
    try {
      // Cek apakah token tersimpan di AsyncStorage
      const storedToken = await AsyncStorage.getItem('@token');
      if (storedToken) {
        // Jika token tersimpan, simpan token di Redux state
        dispatch(loginSuccess(storedToken));
      }
    } catch (error) {
      console.log('Error checking auth status:', error);
    } finally {
      // Setelah proses selesai, atur isLoading menjadi false
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Panggil fungsi checkAuthStatus saat komponen mount
    checkAuthStatus();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <NavigationContainer>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Colors.white}
            translucent={false}
          />
          {!token ? <AuthNavigation /> : <MainNavigation />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default AppNavigation;
