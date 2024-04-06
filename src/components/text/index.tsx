import React from 'react';
import {Text as RNText, TextProps} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

interface PoppinsTextProps extends TextProps {
  children: React.ReactNode;
}

const PoppinsText: React.FC<PoppinsTextProps> = ({
  children,
  style,
  ...rest
}) => {
  return (
    <RNText
      style={[
        {fontFamily: 'Poppins-Regular', color: Colors.black, fontWeight: '600'},
        style,
      ]}
      {...rest}>
      {children}
    </RNText>
  );
};

export default PoppinsText;
