import React, {useRef} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import Colors from '../../constans/colors';
import TextComponent from '../text';
import Helper from '../../helpers/helper';
import CustomBottomSheetModal from '../BottomSheet/customBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useBottomSheetBackHandler} from '../BottomSheet/BackHandler';

// Definisikan tipe data untuk setiap item dalam array data
interface ApplicationData {
  id: number;
  status: string;
  companyName: string;
  position: string;
  employmentType: string;
  portal: string;
  offering: string;
  progressDate: string;
}

interface Props {
  data: ApplicationData; // Tipe prop 'data' adalah ApplicationData
  onPress?: () => void;
}

const ApplicationCard: React.FC<Props> = ({data, onPress}) => {
  const bottomSheetRefUpdate = useRef<BottomSheetModal>(null);
  const bottomSheetUpdateHandler = () => {
    return bottomSheetRefUpdate.current?.present();
  };
  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(bottomSheetRefUpdate);
  return (
    <>
      <TouchableOpacity
        key={data.id}
        style={{marginTop: 4, marginHorizontal: 2}}
        activeOpacity={0.8}>
        <View style={[styles.container]}>
          <View style={styles.containerStatus}>
            <TextComponent style={styles.TextStatus}>
              {data.status}
            </TextComponent>
          </View>
          <TextComponent style={styles.TextCompany} numberOfLines={1}>
            {data.companyName}
          </TextComponent>
          <TextComponent style={styles.TextDetail}>
            {data.position}
            {'\n'}
            {data.employmentType}
            {'\n'}
            {data.portal}
          </TextComponent>

          <View style={styles.line} />

          <View style={{flexDirection: 'row', gap: 4}}>
            <View style={styles.markProgress} />
            <TextComponent style={styles.progress}>
              {data.offering}
              {'\n'}
              {data.progressDate}
            </TextComponent>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={bottomSheetUpdateHandler}>
            <TextComponent style={styles.buttonEdit}>Update</TextComponent>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <CustomBottomSheetModal
        ref={bottomSheetRefUpdate}
        snapPoints={['25%', '50%', '75%']}
        onchange={handleSheetPositionChange}
        title="Update">
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <TextComponent
              style={[styles.TextCompany, {fontSize: Helper.fontSize(16)}]}
              numberOfLines={1}>
              {data.companyName}
            </TextComponent>
            <TextComponent style={styles.TextDetail}>
              {data.position}
              {'\n'}
              {data.employmentType}
              {'\n'}
              {data.portal}
            </TextComponent>
          </View>

          <View style={{flexDirection: 'row', gap: 4}}>
            <View
              style={[styles.markProgress, {backgroundColor: Colors.blue}]}
            />
            <TextComponent style={styles.progress}>
              {data.offering}
              {'\n'}
              {data.progressDate}
            </TextComponent>
          </View>
        </View>
      </CustomBottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    // borderWidth: 0.5,
    borderColor: Colors.grey,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  containerStatus: {
    alignSelf: 'center',
    backgroundColor: Colors.brokenWhite,
    borderRadius: 27,
    width: 104,
    paddingVertical: 4,
    alignItems: 'center',
    marginBottom: 10,
  },
  TextStatus: {
    fontSize: Helper.fontSize(13),
    color: Colors.black,
    fontWeight: '700',
  },
  TextCompany: {
    fontSize: Helper.fontSize(14),
    color: Colors.black,
    fontWeight: '900',
    width: Helper.normalize(140),
  },
  TextDetail: {
    fontSize: Helper.fontSize(14),
    color: Colors.black,
    fontWeight: '600',
  },
  line: {
    borderWidth: 0.2,
    borderColor: Colors.grey,
    marginVertical: 6,
  },
  markProgress: {
    backgroundColor: Colors.black,
    width: 14,
    height: 14,
    borderRadius: 14 / 2,
    marginTop: 1,
  },
  progress: {fontWeight: '600', fontSize: Helper.fontSize(12)},
  buttonEdit: {
    fontSize: Helper.fontSize(14),
    color: Colors.blue,
    fontWeight: '700',
    alignSelf: 'flex-end',
  },
  progressIndicator: {
    height: 20,
    width: 20,
    backgroundColor: Colors.blue,
    borderRadius: 20 / 2,
  },
});
export default ApplicationCard;
