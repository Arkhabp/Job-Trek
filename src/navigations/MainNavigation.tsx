import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './TabNavigation';
import DetailApplicationScreen from '../screens/onBoarding/DetailApplication';
import {Alert} from 'react-native';
import Icons from '../components/icon';
import Colors from '../constans/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useAppDispatch, useAppSelector} from '../../hook';
import {RootState} from '../store';
import {types} from '../constans/editApplication.constan';
import {useNavigation} from '@react-navigation/native';
import IndustryScreen from '../screens/onBoarding/IndustryScreen';
import {fonts} from '../helpers/fonst';

const MainNavigation = () => {
  const navigation = useNavigation();
  const Stack = createNativeStackNavigator();
  const dispatch = useAppDispatch();

  const dataApplication = useAppSelector(
    (state: RootState) => state?.editApplication.data,
  );

  const BackIcon = ({onPress}: {onPress?: () => void}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          onPress && onPress();
        }}
        style={{marginRight: 18}}
        activeOpacity={0.8}>
        <Icons name={'ArrowLeft'} color={Colors.black} size={20} />
      </TouchableOpacity>
    );
  };

  function handleEdit() {
    if (dataApplication) {
      dispatch({type: types.ON_FOUCUS_STATE_FALSE});
    } else {
      Alert.alert('Want to Archive');
    }
  }
  function handleBackEdit() {
    dispatch({type: types.ON_FOUCUS_STATE_FALSE});
  }
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
          headerLeft: () => <BackIcon onPress={handleBackEdit} />,
          headerRight: () => (
            <TouchableOpacity onPress={() => handleEdit()} activeOpacity={0.8}>
              <Icons
                name={dataApplication ? 'Cancel' : 'Archive'}
                color={Colors.blue}
                size={20}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Industry"
        component={IndustryScreen}
        options={{
          title: 'Industry',
          headerLeft: () => <BackIcon />,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;
