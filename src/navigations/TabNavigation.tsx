import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';

import HomeScreen from '../screens/onBoarding/HomeScreen';
import ProfileScreen from '../screens/onBoarding/ProfileScreen';
import AddAplicationScreen from '../screens/onBoarding/AddApplicationScreen';
import Helper from '../helpers/helper';
import Colors from '../constans/colors';
import Icons from '../components/icon';
import {View} from 'react-native';
import TextComponent from '../components/text';
import {PaperProvider} from 'react-native-paper';

// Membuat tipe props untuk komponen TabNavigation
type TabNavigationProps = {};

const Tab = createBottomTabNavigator();

const TabNavigation: React.FC<TabNavigationProps> = () => {
  const navigation = useNavigation();
  return (
    <PaperProvider>
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
                  <View style={[styles.addContainer, Helper.getShadowStyle()]}>
                    <View
                      style={[styles.addContainer1, Helper.getShadowStyle()]}>
                      <Icons
                        name={'Plus'}
                        size={Helper.normalize(20)}
                        color={Colors.white}
                      />
                      <TextComponent
                        style={{
                          color: Colors.white,
                          fontSize: Helper.fontSize(9),
                        }}>
                        ADD
                      </TextComponent>
                    </View>
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
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  TabBarStyle: {
    height: Helper.normalize(42),
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
    width: Helper.normalize(52),
    height: Helper.normalize(52),
    borderRadius: Helper.normalize(52) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.brokenWhite,
    top: Helper.normalize(-6),
    gap: 3,
  },
  addContainer1: {
    width: Helper.normalize(42),
    height: Helper.normalize(42),
    borderRadius: Helper.normalize(42) / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
    gap: 3,
    paddingTop: 6,
  },
});

export default TabNavigation;
