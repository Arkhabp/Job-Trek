import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Colors from '../../constans/colors';
import TextComponent from '../text';
import Helper from '../../helpers/helper';
import CustomBottomSheetModal from '../BottomSheet/customBottomSheet';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {useBottomSheetBackHandler} from '../BottomSheet/BackHandler';
import statusType from '../../constans/statusType';
import {Calendar} from 'react-native-calendars';
import {TextInput} from 'react-native-gesture-handler';
import DefaultButton from '../Buttons/defaultButton';
import {useNavigation} from '@react-navigation/native';

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
  const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
  const [selected, setSelected] = useState(
    new Date().toISOString().split('T')[0],
  );
  const status = statusType;
  const navigation = useNavigation();

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
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailApp')}>
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
        snapPoints={['45%', '80%']}
        onchange={() => {
          handleSheetPositionChange(0);
          setSelected(new Date().toISOString().split('T')[0]);
          setSelectedStatus(null);
        }}
        title="Update">
        <BottomSheetScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            style={{
              justifyContent: 'flex-end',
            }}
            keyboardVerticalOffset={60}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
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

            <View style={styles.line} />

            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 6,
              }}>
              {status
                .filter(item => item.id !== 0)
                .map(item => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={item.id}
                    onPress={() => setSelectedStatus(item.id)}>
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor:
                          selectedStatus === item.id
                            ? Colors.blue
                            : Colors.grey,
                        borderRadius: 16,
                        width: 100,
                        paddingVertical: 4,
                        alignItems: 'center',
                        marginRight: 4,
                      }}>
                      <TextComponent
                        style={{
                          fontSize: Helper.fontSize(14),
                          color:
                            selectedStatus === item.id
                              ? Colors.blue
                              : Colors.grey,
                          fontWeight:
                            selectedStatus === item.id ? '900' : '700',
                        }}>
                        {item.name}
                      </TextComponent>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>

            <Calendar
              onDayPress={day => {
                setSelected(day.dateString);
              }}
              markedDates={{
                [selected]: {
                  selected: true,
                  disableTouchEvent: true,
                },
              }}
            />

            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.grey,
                borderRadius: Helper.normalize(8),
                paddingLeft: 12,
                height: Helper.normalize(36),
                marginTop: 10,
              }}>
              <TextInput
                placeholder="Progress"
                placeholderTextColor={Colors.grey}
                style={{flex: 1, color: Colors.black}}
              />
            </View>

            <DefaultButton
              color="primary"
              type="solid"
              textColor={Colors.white}
              onPress={() => ''}
              size="medium"
              fontSize={Helper.fontSize(16)}
              borderRadius={Helper.normalize(6)}
              minWidth={150}
              style={{marginTop: 35}}>
              Update
            </DefaultButton>
          </KeyboardAvoidingView>
        </BottomSheetScrollView>
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
