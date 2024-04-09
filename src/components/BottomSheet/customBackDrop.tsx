import React, {useMemo} from 'react';
import {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

const CustomBackdrop = ({animatedIndex, style}: BottomSheetBackdropProps) => {
  // animated variables
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animatedIndex.value,
      [0, 1],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  // Set opacity level
  const backdropOpacity = useMemo(() => 0.5, []);

  // Set background color with opacity
  const containerStyle = useMemo(
    () => [
      style,
      {
        backgroundColor: `rgba(0, 0, 0, ${backdropOpacity})`, // rgba color with opacity
      },
      containerAnimatedStyle,
    ],
    [style, containerAnimatedStyle, backdropOpacity],
  );

  return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
