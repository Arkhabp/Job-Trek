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
import {useDispatch, useSelector} from 'react-redux';

import {RootStackParamList} from '../../../navigations/types';
import {handleLogin} from '../../../store/redux/action/auth';
import {RootState} from '../../../store';
import Colors from '../../../constans/colors';
import Helper from '../../../helpers/helper';
import PoppinsText from '../../../components/text';

import validationSignInSchema from './validation';
import DefaultButton from '../../../components/Buttons/defaultButton';

interface StyledInputProps extends TextInputProps {
  formikProps: any;
  formikKey: string;
  placeholder: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  formikProps,
  formikKey,
  placeholder,
  ...rest
}) => {
  return (
    <View style={{marginBottom: 2}}>
      <TextInput
        placeholder={placeholder}
        style={styles.TextInput}
        onChangeText={text => formikProps.handleChange(formikKey)(text)}
        onBlur={() => formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <PoppinsText style={{color: Colors.red, fontSize: Helper.fontSize(12)}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </PoppinsText>
    </View>
  );
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignInScreen: React.FC<Props> = ({navigation: {navigate}}) => {
  const dispatch = useDispatch(); // Move useDispatch inside the functional component
  const state = useSelector((state: RootState) => state?.auth?.signIn);

  const onSubmit = (values: {email: string; password: string}) => {
    const {email, password} = values;
    dispatch(handleLogin(email, password));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Pressable onPress={Keyboard.dismiss}>
        <View
          style={{alignItems: 'center', marginBottom: Helper.normalize(62)}}>
          <PoppinsText style={styles.title}>Sign In</PoppinsText>
          <PoppinsText style={styles.greating}>Hi! Welcome back</PoppinsText>
        </View>

        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={onSubmit}
          validationSchema={validationSignInSchema}>
          {formikProps => (
            <React.Fragment>
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
                    fontSize={Helper.fontSize(16)}
                    borderRadius={Helper.normalize(6)}
                    minWidth={150}>
                    Sign In
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
          <PoppinsText
            style={{
              color: Colors.blue,
              fontSize: Helper.fontSize(12),
              fontWeight: '600',
            }}>
            Don't have an account?{' '}
          </PoppinsText>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <PoppinsText
              style={{
                color: Colors.blue,
                fontSize: Helper.fontSize(12),
                fontWeight: '700',
              }}>
              Sign Up
            </PoppinsText>
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
    fontWeight: '700',
    color: Colors.blue,
  },
  greating: {
    fontSize: Helper.fontSize(14),
    fontWeight: '500',
    color: Colors.blue,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: Helper.normalize(8),
    paddingLeft: 12,
    paddingVertical: Helper.normalize(8),
    color: Colors.black,
  },
});

export default SignInScreen;
