import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import PoppinsText from '../text';
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Colors from '../../constans/colors';

type Props = {
  topAnimation: SharedValue<number>;
  openHeight: number;
  closeHeght: number;
  close: () => void;
  backDropColor?: string;
};

const BackDrop = ({
  topAnimation,
  openHeight,
  closeHeght,
  close,
  backDropColor,
}: Props) => {
  const backDropAnimation = useAnimatedStyle(() => {
    const opacity = interpolate(
      topAnimation.value,
      [closeHeght, openHeight],
      [0, 0.5],
    );
    const display = opacity === 0 ? 'none' : 'flex';
    return {
      opacity,
      display,
    };
  });
  return (
    <TouchableWithoutFeedback onPress={() => close()}>
      <Animated.View
        style={[
          styles.container,
          backDropAnimation,
          {backgroundColor: backDropColor ? backDropColor : Colors.black},
        ]}></Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    display: 'none',
    flex: 1,
  },
});
export default BackDrop;
