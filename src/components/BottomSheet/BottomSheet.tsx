import React, {
  ReactNode,
  forwardRef,
  useCallback,
  useImperativeHandle,
} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TextComponent from '../text';
import Colors from '../../constans/colors';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import BackDrop from './BackDrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store';

type Props = {
  snapTo: string;
  backgroundColor?: string;
  backDropColor?: string;
  children?: ReactNode;
};

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheet = forwardRef<BottomSheetMethods, Props>(
  ({snapTo, backgroundColor, backDropColor, children}: Props, ref) => {
    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const closeHeight = height;
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const dispatch = useDispatch();
    const isOpen = useSelector(
      (state: RootState) => state?.bottomSheet?.isOpen,
    );

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight);
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight);
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        // console.log('onBegin');
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        // console.log(event.translationY);
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(event.translationY + context.value, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        // console.log('onEnd');
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          }); //jika topAnimation value lebih dari openHeight + 50 maka akan menutup bottom sheet
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          }); //jika tidak maka akan kembali ke nilai awal
        }
      });
    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
          backDropColor={backDropColor}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: backgroundColor
                  ? backgroundColor
                  : Colors.white,
                paddingBottom: inset.bottom,
              },
            ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line}></View>
            </View>
            {children}
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.grey,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    width: '10%',
    height: 4,
    borderRadius: 10,
    backgroundColor: Colors.black,
  },
});

export default BottomSheet;
