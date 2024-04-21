import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../hook';

import Colors from '../../constans/colors';
import {types} from '../../constans/editApplication.constan';

const IndustryScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          dispatch({type: types.ON_FOUCUS_STATE_TRUE});
          navigation.goBack();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Industry</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyText}>
          <Text style={styles.bodyTextText}>Industry</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  header: {
    backgroundColor: Colors.white,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 20,
  },
  body: {
    backgroundColor: Colors.white,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyText: {
    backgroundColor: Colors.white,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyTextText: {
    color: Colors.black,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default IndustryScreen;
