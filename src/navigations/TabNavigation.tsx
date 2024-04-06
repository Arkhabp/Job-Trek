import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

import HomeScreen from '../screens/onBoarding/homeScreen';
import ProfileScreen from '../screens/onBoarding/profileScreen';
import AddAplicationScreen from '../screens/onBoarding/addApplicationScreen';
import Helper from '../helpers/helper';
import Colors from '../constans/colors';
import Icons from '../components/icon';
import {View} from 'react-native';
import PoppinsText from '../components/text';

// Membuat tipe props untuk komponen TabNavigation
type TabNavigationProps = {};

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC<TabNavigationProps> = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="initialRoute"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.TabBarStyle,
        tabBarInactiveTintColor: Colors.grey,
        tabBarActiveTintColor: Colors.black,
        tabBarLabelStyle: {
          fontSize: Helper.fontSize(11),
          fontWeight: '600',
          marginTop: Helper.normalize(-6),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icons
                name={'Home'}
                color={focused ? Colors.black : Colors.grey}
                size={Helper.normalize(18)}
              />
            );
          },
          tabBarLabel: 'Home',
          headerShadowVisible: false,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Add"
        component={AddAplicationScreen}
        options={({}) => ({
          tabBarLabel: '',
          tabBarIcon: ({focused}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Add')}>
                <View style={styles.addContainer}>
                  <Icons
                    name={'Plus'}
                    size={Helper.normalize(24)}
                    color={Colors.white}
                  />
                  <PoppinsText
                    style={{
                      color: Colors.white,
                      fontSize: Helper.fontSize(10),
                    }}>
                    ADD
                  </PoppinsText>
                </View>
              </TouchableOpacity>
            );
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({}) => ({
          tabBarIcon: ({focused}) => {
            return (
              <Icons
                name={'Profile'}
                color={focused ? Colors.black : Colors.grey}
                size={Helper.normalize(18)}
              />
            );
          },
          tabBarLabel: 'Profile',
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  TabBarStyle: {
    height: Helper.normalize(45),
    borderTopLeftRadius: Helper.normalize(14),
    borderTopRightRadius: Helper.normalize(14),
    position: 'absolute',
    paddingBottom: Helper.normalize(5),
    alignContent: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  addContainer: {
    width: Helper.normalize(56),
    height: Helper.normalize(56),
    borderRadius: Helper.normalize(56) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    top: Helper.normalize(-6),
    gap: 3,
    paddingTop: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: Platform.OS === 'android' ? 2 : 0,
  },
});

export default TabNavigation;
