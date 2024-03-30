import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

interface PoppinsTextProps extends TextProps {
  children: React.ReactNode;
}

const PoppinsText: React.FC<PoppinsTextProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <RNText style={[{fontFamily: 'Poppins-Regular'}, style]} {...rest}>
      {children}
    </RNText>
  );
};

export default PoppinsText;
