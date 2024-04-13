import React, {ReactNode, forwardRef, useCallback, useMemo} from 'react';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {BottomSheetBackdrop, BottomSheetModal} from '@gorhom/bottom-sheet';
import TextComponent from '../text';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Helper from '../../helpers/helper';
import Colors from '../../constans/colors';

export type Ref = BottomSheetModal;

type CustomBottomSheetModalProps = {
  title?: string;
  children?: ReactNode;
  snapPoints?: string[] | undefined;
  onchange?: any;
};

const CustomBottomSheetModal = forwardRef<Ref, CustomBottomSheetModalProps>(
  ({children, snapPoints, onchange, title}, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetDefaultBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={2}
        />
      ),
      [],
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        index={0}
        backdropComponent={renderBackdrop}
        enableDismissOnClose={true}
        onChange={onchange}>
        <View style={styles.headerContainer}>
          <TextComponent style={styles.title}>{title}</TextComponent>
          <View style={styles.line} />
        </View>
        <View style={styles.contentContainer}>{children}</View>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: '700',
    fontSize: Helper.fontSize(13),
  },
  line: {
    width: '98%',
    borderBottomWidth: 1,
    borderColor: Colors.brokenWhite,
  },
});

export default CustomBottomSheetModal;
