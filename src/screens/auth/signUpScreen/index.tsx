import React, {Fragment} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TextInputProps,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import {Formik} from 'formik';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAppDispatch, useAppSelector} from '../../../../hook';

import Colors from '../../../constans/colors';
import Helper from '../../../helpers/helper';
import validationSignInSchema from './validation';
import DefaultButton from '../../../components/Buttons/defaultButton';
import {RootStackParamList} from '../../../navigations/types';
import TextComponent from '../../../components/text';
import {RootState} from '../../../store';
import {handleSignup} from '../../../store/redux/action/auth';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../../helpers/fonst';
import StyledInput from '../../../components/TextInput';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state?.auth?.signUp);

  const onSubmit = (values: {
    email: string;
    password: string;
    name: string;
  }) => {
    const {email, password, name} = values;
    dispatch(handleSignup(email, password, name));
  };
  return (
    <SafeAreaView style={styles.wrapper}>
      <Pressable onPress={Keyboard.dismiss}>
        <View
          style={{alignItems: 'center', marginBottom: Helper.normalize(62)}}>
          <TextComponent style={styles.title}>Creat Account</TextComponent>
          <TextComponent style={styles.greating}>
            Fill your information below
          </TextComponent>
        </View>

        <Formik
          initialValues={{name: '', email: '', password: ''}}
          onSubmit={onSubmit}
          validationSchema={validationSignInSchema}>
          {formikProps => (
            <React.Fragment>
              <StyledInput
                formikProps={formikProps}
                formikKey="name"
                placeholder="Full name"
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="email"
                placeholder="Email"
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="password"
                placeholder="Password"
                secureTextEntry
              />

              {state?.isLoading ? (
                <ActivityIndicator />
              ) : (
                <View style={{marginTop: Helper.normalize(22)}}>
                  <DefaultButton
                    color="primary"
                    type="solid"
                    textColor={Colors.white}
                    onPress={() => formikProps.handleSubmit()}
                    size="medium"
                    borderRadius={Helper.normalize(6)}
                    minWidth={150}>
                    Sign Up
                  </DefaultButton>
                </View>
              )}
            </React.Fragment>
          )}
        </Formik>

        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: Helper.normalize(16),
          }}>
          <TextComponent
            style={{
              color: Colors.blue,
              fontSize: Helper.fontSize(12),
              fontWeight: '600',
            }}>
            Already have an acoount?{' '}
          </TextComponent>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <TextComponent
              style={{
                color: Colors.blue,
                fontSize: Helper.fontSize(12),
                fontWeight: '700',
              }}>
              Sign In
            </TextComponent>
          </TouchableOpacity>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: Helper.normalize(22),
  },
  title: {
    fontSize: Helper.fontSize(40),
    color: Colors.blue,
    fontFamily: fonts.SemiBold,
    marginBottom: -12,
  },
  greating: {
    fontSize: Helper.fontSize(14),
    fontFamily: fonts.Regular,
    color: Colors.blue,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: Helper.normalize(8),
    paddingVertical: Helper.normalize(8),
    paddingLeft: 12,
    color: Colors.black,
  },
});

export default SignUpScreen;
