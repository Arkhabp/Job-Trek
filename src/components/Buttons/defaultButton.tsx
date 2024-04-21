import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Colors from '../../constans/colors';
import Helper from '../../helpers/helper';
import TextComponent from '../text';
import {fonts} from '../../helpers/fonst';
import Icons from '../icon';

interface DefaultButtonProps extends TouchableOpacityProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'normal'
    | 'error'
    | 'dark'
    | 'darkGrey'
    | 'brokenWhite';
  textColor?: string;
  type?: 'outline' | 'solid' | 'delete';
  onPress?: any;
  size?: 'small' | 'medium' | 'large';
  fontSize?: number;
  borderRadius?: number;
  minWidth?: number;
  loading?: boolean;
  children: any;
  style?: StyleProp<ViewStyle>;
  iconName?: string;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({
  color = 'primary',
  type = 'outline',
  textColor: txtColor,
  children,
  size = 'medium',
  fontSize,
  borderRadius,
  minWidth,
  onPress,
  style,
  iconName,
  ...props
}) => {
  let backgroundColor = Colors.blue;
  let textColor: string = txtColor ?? Colors.white;

  if (color === 'secondary') {
    backgroundColor = Colors.red;
  }
  if (color === 'error') {
    backgroundColor = Colors.red;
  }
  if (color === 'normal') {
    backgroundColor = Colors.white;
  }

  if (color === 'dark') {
    backgroundColor = Colors.white;
    textColor = txtColor || Colors.black;
  }

  if (color === 'darkGrey') {
    backgroundColor = Colors.brokenWhite;
    textColor = txtColor || Colors.black;
  }

  if (type === 'outline') {
    textColor = txtColor || Colors.red;
  }
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        type === 'solid'
          ? styles.container
          : type === 'outline'
          ? styles.outline
          : styles.delete,
        {
          paddingVertical:
            size === 'small'
              ? 6
              : size === 'medium'
              ? 6
              : size === 'large'
              ? 16
              : 12,
          paddingHorizontal: size === 'small' ? 16 : size === 'large' ? 24 : 20,
          borderRadius: borderRadius || 10,
          minWidth: minWidth || undefined,
          ...(style as any),
          // borderColor: color === 'darkGrey' ? Colors.blue : 'transparent',
          // borderWidth: type === 'outline' && color === 'darkGrey' ? 1 : 0,
        },
      ]}
      {...props}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Icons
          name={iconName}
          size={19}
          color={
            type === 'solid'
              ? Colors.white
              : type === 'outline'
              ? Colors.blue
              : Colors.white
          }
        />
        <TextComponent
          style={{
            color:
              type === 'solid'
                ? Colors.white
                : type === 'outline'
                ? Colors.blue
                : Colors.white,
            fontSize: size === 'small' ? 11 : size === 'large' ? 18 : 16,
            fontFamily: fonts.SemiBold,
            marginTop: iconName ? 5 : 2,
          }}>
          {children}
        </TextComponent>
      </View>
    </TouchableOpacity>
  );
};

DefaultButton.propTypes = {
  textColor: PropTypes.string,
  type: PropTypes.oneOf(['outline', 'solid', 'delete']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fontSize: PropTypes.number,
  borderRadius: PropTypes.number,
  minWidth: PropTypes.number,
  loading: PropTypes.bool,
};

export default DefaultButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  outline: {
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
  },
  delete: {
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.red,
  },
  outlineDark: {
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.blue,
    borderWidth: 1,
  },
});
