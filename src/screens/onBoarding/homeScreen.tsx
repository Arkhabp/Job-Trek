import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {logout} from '../../services/auth';
import {RootStackParamList} from '../../navigations/types';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const HomeScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const handleLogout = async () => {
    try {
      await logout();
      replace('AuthNavigation');
      await AsyncStorage.clear();
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => handleLogout()}>
        <Text>Home Screen</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default HomeScreen;
