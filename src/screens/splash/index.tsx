import React from 'react';
import {SafeAreaView, View, Image, Text, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/images/logo.png')} />
            </View> */}
      <View style={styles.textContainer}>
        <Text style={styles.text}>JobTrek</Text>
      </View>
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
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: '700',
    color: '#000000',
  },
});

export default SplashScreen;
