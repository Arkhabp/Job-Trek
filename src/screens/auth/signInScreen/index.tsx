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

import {RootStackParamList} from '../../../navigations/types';
import {handleLogin} from '../../../store/redux/action/auth';
import {RootState} from '../../../store';
import Colors from '../../../constans/colors';
import Helper from '../../../helpers/helper';
import TextComponent from '../../../components/text';

import validationSignInSchema from './validation';
import DefaultButton from '../../../components/Buttons/defaultButton';
import {useNavigation} from '@react-navigation/native';

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
        placeholderTextColor={Colors.grey}
        {...rest}
      />
      <TextComponent style={{color: Colors.red, fontSize: Helper.fontSize(12)}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </TextComponent>
    </View>
  );
};

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch(); // Move useDispatch inside the functional component
  const state = useAppSelector((state: RootState) => state?.auth?.signIn);

  const onSubmit = (values: {email: string; password: string}) => {
    const {email, password} = values;
    dispatch(handleLogin(email, password));
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Pressable onPress={Keyboard.dismiss}>
        <View
          style={{alignItems: 'center', marginBottom: Helper.normalize(62)}}>
          <TextComponent style={styles.title}>Sign In</TextComponent>
          <TextComponent style={styles.greating}>
            Hi! Welcome back
          </TextComponent>
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
          <TextComponent
            style={{
              color: Colors.blue,
              fontSize: Helper.fontSize(12),
              fontWeight: '600',
            }}>
            Don't have an account?{' '}
          </TextComponent>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <TextComponent
              style={{
                color: Colors.blue,
                fontSize: Helper.fontSize(12),
                fontWeight: '700',
              }}>
              Sign Up
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
