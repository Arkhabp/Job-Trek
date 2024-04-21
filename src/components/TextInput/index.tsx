import React from 'react';
import {StyleSheet, TextInput, TextInputProps, View} from 'react-native';
import Colors from '../../constans/colors';
import Helper from '../../helpers/helper';
import {fonts} from '../../helpers/fonst';
import TextComponent from '../text';
import Icons from '../icon';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface StyledInputProps extends TextInputProps {
  formikProps: any;
  formikKey: string;
  placeholder?: string;
  onpress?: () => void;
  addStyle?: any;
  multipleLine?: boolean;
  carretHidden?: boolean;
  styleOnFocused?: any;
  valueBottonInput?: string;
}
export type Ref = TextInput;
const StyledInput = React.forwardRef<Ref, StyledInputProps>(
  (
    {
      formikProps,
      formikKey,
      placeholder,
      onpress,
      addStyle,
      multipleLine,
      caretHidden,
      styleOnFocused,
      valueBottonInput,
      ...rest
    },
    ref,
  ) => {
    return (
      <>
        {onpress ? (
          <TouchableOpacity
            style={[styles.BottonInput, styleOnFocused]}
            onPress={onpress}
            activeOpacity={0.8}>
            {/* <TextInput
              ref={ref as any}
              placeholder={placeholder}
              onChangeText={text => formikProps.handleChange(formikKey)(text)}
              onBlur={() => formikProps.handleBlur(formikKey)}
              placeholderTextColor={Colors.grey}
              style={{
                ...addStyle,
              }}
              multiline={multipleLine}
              {...rest}
              editable={false}
            /> */}
            <TextComponent
              style={{
                color: Colors.black,
                fontSize: Helper.fontSize(14),
                fontWeight: '700',
              }}>
              {valueBottonInput ? valueBottonInput : placeholder}
            </TextComponent>

            <Icons name="AngleRight" size={20} color={Colors.grey} />
          </TouchableOpacity>
        ) : (
          <View style={[styles.TextInput, styleOnFocused]}>
            <TextInput
              ref={ref as any}
              placeholder={placeholder}
              onChangeText={text => formikProps.handleChange(formikKey)(text)}
              onBlur={() => formikProps.handleBlur(formikKey)}
              placeholderTextColor={Colors.grey}
              style={{
                width: '100%',
                height: 48,
                ...addStyle,
                color: Colors.black,
                fontFamily: fonts.Regular,
                fontWeight: '700',
                fontSize: Helper.fontSize(14),
              }}
              multiline={multipleLine}
              {...rest}
              caretHidden={caretHidden}
            />
          </View>
        )}

        <TextComponent
          style={{
            color: Colors.red,
            fontSize: Helper.fontSize(12),
            fontFamily: fonts.Light,
          }}>
          {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
        </TextComponent>
      </>
    );
  },
);

const styles = StyleSheet.create({
  TextInput: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: Helper.normalize(8),
    paddingHorizontal: 12,
    color: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  BottonInput: {
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: Helper.normalize(8),
    paddingHorizontal: 12,
    color: Colors.black,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
  },
});

export default StyledInput;
