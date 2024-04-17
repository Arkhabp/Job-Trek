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
  placeholder: string;
  onpress?: () => void;
  addStyle?: any;
  multipleLine?: boolean;
  value?: string;
}
const StyledInput: React.FC<StyledInputProps> = ({
  formikProps,
  formikKey,
  placeholder,
  onpress,
  addStyle,
  multipleLine,
  value,
  ...rest
}) => {
  return (
    <>
      {onpress ? (
        <TouchableOpacity
          style={[styles.TextInput]}
          onPress={onpress}
          activeOpacity={0.8}>
          <TextInput
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
            value={value}
          />

          <Icons name="AngleRight" size={20} color={Colors.blue} />
        </TouchableOpacity>
      ) : (
        <View style={[styles.TextInput]}>
          <TextInput
            placeholder={placeholder}
            onChangeText={text => formikProps.handleChange(formikKey)(text)}
            onBlur={() => formikProps.handleBlur(formikKey)}
            placeholderTextColor={Colors.grey}
            style={{
              width: '100%',
              ...addStyle,
            }}
            multiline={multipleLine}
            {...rest}
            editable={!onpress}
            value={value}
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
};

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
});

export default StyledInput;
