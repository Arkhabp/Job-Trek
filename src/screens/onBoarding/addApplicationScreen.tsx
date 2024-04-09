import React, {useRef} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Button,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {handleSignOut} from '../../store/redux/action/auth';

import {RootStackParamList} from '../../navigations/types';
import {useDispatch} from 'react-redux';
import {
  BottomSheetModal,
  useBottomSheet,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../components/BottomSheet/customBottomSheet';
import TextComponent from '../../components/text';
import {useBottomSheetBackHandler} from '../../components/BottomSheet/BackHandler';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const AddAplicationScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const dispatch = useDispatch();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const bottomSheetRef2 = useRef<BottomSheetModal>(null);
  const bottomSheetRef3 = useRef<BottomSheetModal>(null);

  const {dismiss} = useBottomSheetModal();
  const handlePresentModalPress = () => bottomSheetRef.current?.present();
  const handlePresentModalPress2 = () => bottomSheetRef2.current?.present();
  const handlePresentModalPress3 = () => bottomSheetRef3.current?.present();

  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(bottomSheetRef3);

  const handleCloseModalPress = () => bottomSheetRef.current?.dismiss();
  const handleCloseModalPress2 = () => bottomSheetRef2.current?.dismiss();
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => ''}>
        <Text>Add Application Screen</Text>
      </TouchableOpacity>

      <Button title="Present" onPress={handlePresentModalPress} />
      <Button title="Present2" onPress={handlePresentModalPress2} />
      <Button title="Present3" onPress={handlePresentModalPress3} />
      <Button title="Close" onPress={handleCloseModalPress} />
      <Button title="Close" onPress={handleCloseModalPress2} />
      <CustomBottomSheetModal ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <TextComponent>HII</TextComponent>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={bottomSheetRef2} snapPoints={['25%', '50%']}>
        <TextComponent>HII 2</TextComponent>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal
        ref={bottomSheetRef3}
        snapPoints={['25%', '50%']}
        onchange={handleSheetPositionChange}>
        <TextComponent>HII 3</TextComponent>
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default AddAplicationScreen;
