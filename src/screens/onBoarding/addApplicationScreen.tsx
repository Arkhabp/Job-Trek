import React, {useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {handleSignOut} from '../../store/redux/action/auth';

import {RootStackParamList} from '../../navigations/types';
import {useAppSelector} from '../../../hook';
import {useSelector} from 'react-redux';
import {RootState} from '../../store';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const AddAplicationScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const updateData = useAppSelector(
    (state: RootState) => state?.application?.updateApplication.data,
  );

  console.log('DATA SELECTOR', updateData);
  return (
    <SafeAreaView style={styles.container}>
      <Text>asdas</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

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

export default AddAplicationScreen;
