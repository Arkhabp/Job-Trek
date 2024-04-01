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

import Colors from '../../../constans/colors';
import Helper from '../../../helpers/helper';
import validationSignInSchema from './validation';
import DefaultButton from '../../../components/Buttons/defaultButton';
import {RootStackParamList} from '../../../navigations/types';
import PoppinsText from '../../../components/text';

import {login} from '../../../services/auth';

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
      <PoppinsText style={{color: Colors.red}}>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </PoppinsText>
    </View>
  );
};

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const SignInScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const handleLogin = async (email: any, password: any) => {
    try {
      const user = await login(email, password);
      if (user) {
        replace('MainNavigation');
      }
    } catch (error) {
      console.error(error);
      // Handle any errors here
    }
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
          onSubmit={(values, actions) => {
            handleLogin(values.email, values.password);
            // Alert.alert(JSON.stringify(values));
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 100);
          }}
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

              {formikProps.isSubmitting ? (
                <ActivityIndicator />
              ) : (
                <View style={{marginTop: Helper.normalize(22)}}>
                  <DefaultButton
                    color="primary"
                    type="solid"
                    textColor={Colors.white}
                    onPress={() => formikProps.handleSubmit()}
                    size="medium"
                    fontSize={Helper.normalize(16)}
                    borderRadius={Helper.normalize(9)}
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
            marginTop: Helper.normalize(6),
          }}>
          <PoppinsText
            style={{
              color: Colors.blue,
              fontSize: Helper.normalize(12),
              fontWeight: '600',
            }}>
            Don't have an account?{' '}
          </PoppinsText>
          <TouchableOpacity onPress={() => navigate('SignUp')}>
            <Text
              style={{
                color: Colors.blue,
                fontSize: Helper.normalize(12),
                fontWeight: '700',
              }}>
              Sign Up
            </Text>
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
    fontSize: Helper.normalize(30),
    fontWeight: '700',
    color: Colors.blue,
  },
  greating: {
    fontSize: Helper.normalize(14),
    fontWeight: '500',
    color: Colors.blue,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: Helper.normalize(8),
    paddingLeft: 12,
  },
});

export default SignInScreen;
