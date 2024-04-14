import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import TextComponent from '../../components/text';

const DetailApplicationScreen = () => {
  return (
    <SafeAreaView>
      <TextComponent>Detail Application Screen</TextComponent>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default DetailApplicationScreen;
