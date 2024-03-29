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
  Button,
  GestureResponderEvent,
  TouchableOpacity,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import Colors from '../../constans/colors';
import Helper from '../../helpers/helper';

interface StyledInputProps extends TextInputProps {
  label: string;
  formikProps: any;
  formikKey: string;
  placeholder: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  label,
  formikProps,
  formikKey,
  placeholder,
  ...rest
}) => {
  return (
    <View>
      <Text
        style={{
          marginBottom: 3,
          fontSize: Helper.normalize(14),
          color: Colors.blue,
          fontWeight: '500',
        }}>
        {label}
      </Text>
      <TextInput
        placeholder={placeholder}
        style={{
          borderWidth: 1,
          borderColor: Colors.blue,
          borderRadius: Helper.normalize(8),
          marginBottom: 3,
          paddingLeft: 12,
        }}
        onChangeText={text => formikProps.handleChange(formikKey)(text)}
        onBlur={() => formikProps.handleBlur(formikKey)}
        {...rest}
      />
      <Text>
        {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
      </Text>
    </View>
  );
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Email tidak valid')
    .required('Email tidak boleh kosong'),
  password: yup
    .string()
    .label('password')
    .required('Password tidak boleh kosong')
    .min(2, 'Seems a bit short...')
    .max(10, 'We prefer insecure system, try a shorter password.'),
});

const Login = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{alignItems: 'center', marginBottom: Helper.normalize(58)}}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.greating}>Hi! Welcome back</Text>
      </View>

      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values, actions) => {
          Alert.alert(JSON.stringify(values));
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 100);
        }}
        validationSchema={validationSchema}>
        {formikProps => (
          <React.Fragment>
            <StyledInput
              label="Email"
              formikProps={formikProps}
              formikKey="email"
              placeholder="Type your email address"
              autoFocus
            />
            <StyledInput
              label="password"
              formikProps={formikProps}
              formikKey="password"
              placeholder="Type your password address"
              secureTextEntry
            />

            {formikProps.isSubmitting ? (
              <ActivityIndicator />
            ) : (
              // <Button title="Submit" onPress={formikProps.handleSubmit} />
              <TouchableOpacity
                onPress={() => formikProps.handleSubmit()}
                style={{
                  alignItems: 'center',
                  backgroundColor: Colors.blue,
                  padding: 10,
                  borderRadius: Helper.normalize(9),
                  marginTop: Helper.normalize(15),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: Helper.normalize(16),
                    fontWeight: '500',
                  }}>
                  Sign in
                </Text>
              </TouchableOpacity>
            )}
          </React.Fragment>
        )}
      </Formik>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: Helper.normalize(6),
        }}>
        <Text
          style={{
            color: Colors.blue,
            fontSize: Helper.normalize(12),
            fontWeight: '400',
          }}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              color: Colors.blue,
              fontSize: Helper.normalize(12),
              fontWeight: '700',
            }}>
            Sign Up{' '}
          </Text>
        </TouchableOpacity>
      </View>
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
    fontWeight: '600',
    color: Colors.blue,
  },
  greating: {
    fontSize: Helper.normalize(16),
    fontWeight: '400',
    color: Colors.blue,
  },
});

export default Login;
