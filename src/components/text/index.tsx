import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {fonts} from '../../helpers/fonst';

interface TextComponentProps extends TextProps {
  children: React.ReactNode;
}

const TextComponent: React.FC<TextComponentProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[{fontFamily: fonts.Regular, color: Colors.black}, style]}
      {...rest}>
      {children}
    </RNText>
  );
};

export default TextComponent;
