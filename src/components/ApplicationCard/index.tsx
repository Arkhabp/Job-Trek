import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from 'react-native';

import Colors from '../../constans/colors';
import TextComponent from '../text';
import Helper from '../../helpers/helper';
import CustomBottomSheetModal from '../BottomSheet/customBottomSheet';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useBottomSheetBackHandler} from '../BottomSheet/BackHandler';
import statusType from '../../constans/statusType';
import {Calendar} from 'react-native-calendars';
import {TextInput} from 'react-native-gesture-handler';
import DefaultButton from '../Buttons/defaultButton';
import {useNavigation} from '@react-navigation/native';
import {fonts} from '../../helpers/fonst';
import {Formik} from 'formik';
import validationSchema from '../../validations/validationForm';
import {useAppDispatch} from '../../store/hooks';
import {handleUpdateApplication} from '../../store/redux/action/application';

// Definisikan tipe data untuk setiap item dalam array data
interface ApplicationData {
  id: number;
  status: string;
  statusId: number;
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
  const [selectedStatus, setSelectedStatus] = useState<number | null>(
    data.statusId,
  );
  const [selected, setSelected] = useState(
    new Date().toISOString().split('T')[0],
  );

  const status = statusType;
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const dispatch = useAppDispatch();

  const bottomSheetRefUpdate = useRef<BottomSheetModal>(null);
  const bottomSheetUpdateHandler = () => {
    setSelected(new Date().toISOString().split('T')[0]);
    setSelectedStatus(data.statusId);
    return bottomSheetRefUpdate.current?.present();
  };
  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(bottomSheetRefUpdate);

  // Ambil nama status berdasarkan statusId
  const textStatus =
    statusType.find(item => item.id === data.statusId)?.name || 'Unknown';

  return (
    <>
      <TouchableOpacity
        key={data.id}
        style={{marginTop: 4, marginHorizontal: 2}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('DetailApp', {AppId: data.id})}>
        <View
          style={[
            styles.container,
            {
              width: screenWidth / 2 - 8,
              height: 212,
            },
          ]}>
          <View style={styles.containerStatus}>
            <TextComponent style={styles.TextStatus}>
              {textStatus}
            </TextComponent>
          </View>
          <TextComponent style={styles.TextCompany} numberOfLines={1}>
            {data.companyName}
          </TextComponent>
          <TextComponent style={styles.TextDetail}>
            {data.position}
            {'\n'}
            {data.employmentType} · {data.portal}
          </TextComponent>

          <View style={styles.line} />

          <View style={{flexDirection: 'row', gap: 4}}>
            <View style={styles.markProgress} />
            <TextComponent style={styles.Textprogress}>
              {data.offering}
              {'\n'}
              {data.progressDate}
            </TextComponent>
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={bottomSheetUpdateHandler}
            style={{
              bottom: 10,
              right: 10,
              position: 'absolute',
              alignSelf: 'flex-end',
            }}>
            <TextComponent style={styles.buttonEdit}>Update</TextComponent>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <CustomBottomSheetModal
        ref={bottomSheetRefUpdate}
        snapPoints={['45%', '80%']}
        onchange={handleSheetPositionChange}
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
                <TextComponent style={styles.Textprogress}>
                  {data.offering}
                  {'\n'}
                  {data.progressDate}
                </TextComponent>
              </View>
            </View>

            <View style={styles.line} />

            <Formik
              initialValues={{
                progress: '',
                selectedStatus: data.statusId,
                calendarDate: selected,
              }}
              onSubmit={values => {
                dispatch(handleUpdateApplication(values));
              }}
              validationSchema={validationSchema}>
              {formikProps => (
                <>
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
                          onPress={() => {
                            setSelectedStatus(item.id);
                            formikProps.values.selectedStatus = item.id;
                            formikProps.handleChange('selectedStatus');
                          }}
                          disabled={item.id > data.statusId}>
                          <View
                            style={{
                              borderWidth:
                                item.id > data.statusId
                                  ? 0
                                  : selectedStatus === item.id
                                  ? 1.2
                                  : 1,
                              borderColor:
                                selectedStatus === item.id
                                  ? Colors.blue
                                  : Colors.grey,
                              borderRadius: 16,
                              width: 100,
                              paddingVertical: 1,
                              alignItems: 'center',
                              marginRight: 4,
                              backgroundColor:
                                item.id > data.statusId
                                  ? Colors.brokenWhite
                                  : Colors.white,
                            }}>
                            <TextComponent
                              style={{
                                fontSize: Helper.fontSize(13),
                                color:
                                  selectedStatus === item.id
                                    ? Colors.blue
                                    : Colors.grey,
                                fontFamily:
                                  selectedStatus === item.id
                                    ? fonts.SemiBold
                                    : fonts.Regular,
                                marginTop: 2,
                              }}>
                              {item.name}
                            </TextComponent>
                          </View>
                        </TouchableOpacity>
                      ))}
                  </View>
                  {formikProps.touched.selectedStatus &&
                    formikProps.errors.selectedStatus && (
                      <TextComponent
                        style={{color: 'red', fontSize: Helper.fontSize(12)}}>
                        {formikProps.errors.selectedStatus}
                      </TextComponent>
                    )}

                  <View style={{paddingVertical: 14}}>
                    <Calendar
                      onDayPress={day => {
                        formikProps.values.calendarDate = day.dateString; // Perbarui nilai calendarDate langsung di dalam objek values
                        setSelected(day.dateString); // Tetapkan nilai selected sesuai dengan tanggal yang dipilih
                        formikProps.handleChange('calendarDate');
                      }}
                      markedDates={{
                        [selected]: {
                          selected: true,
                          disableTouchEvent: true,
                        },
                      }}
                    />
                  </View>
                  <TextInput
                    placeholder="Progress"
                    placeholderTextColor={Colors.grey}
                    style={{
                      flex: 1,
                      color: Colors.black,
                      borderWidth: 1,
                      borderColor: Colors.grey,
                      borderRadius: Helper.normalize(8),
                      paddingLeft: 12,
                      height: Helper.normalize(36),
                      marginTop: 10,
                    }}
                    onChangeText={formikProps.handleChange('progress')}
                    onBlur={formikProps.handleBlur('progress')}
                    value={formikProps.values.progress}
                  />
                  {formikProps.touched.progress &&
                    formikProps.errors.progress && (
                      <TextComponent
                        style={{color: 'red', fontSize: Helper.fontSize(12)}}>
                        {formikProps.errors.progress}
                      </TextComponent>
                    )}

                  <DefaultButton
                    color="primary"
                    type="solid"
                    textColor={Colors.white}
                    onPress={formikProps.handleSubmit} // Submit form ketika tombol ditekan
                    size="medium"
                    fontSize={Helper.fontSize(16)}
                    borderRadius={Helper.normalize(6)}
                    minWidth={150}
                    style={{marginTop: 30}}>
                    Update
                  </DefaultButton>
                </>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </BottomSheetScrollView>
      </CustomBottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  containerStatus: {
    alignSelf: 'center',
    backgroundColor: Colors.brokenWhite,
    borderRadius: 27,
    width: '50%',
    paddingVertical: 1,
    alignItems: 'center',
    marginBottom: 10,
  },
  TextStatus: {
    fontSize: Helper.fontSize(12),
    color: Colors.black,
    fontFamily: fonts.SemiBold,
    marginTop: 2,
  },
  TextCompany: {
    fontSize: Helper.fontSize(14),
    color: Colors.black,
    fontFamily: fonts.SemiBold,
    width: '98%',
  },
  TextDetail: {
    fontSize: Helper.fontSize(13),
    color: Colors.grey,
    fontFamily: fonts.Regular,
  },
  line: {
    borderWidth: 0.2,
    borderColor: Colors.grey,
    marginVertical: 16,
  },
  markProgress: {
    backgroundColor: Colors.black,
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: 1,
  },
  Textprogress: {fontFamily: fonts.Regular, fontSize: Helper.fontSize(12)},
  buttonEdit: {
    fontSize: Helper.fontSize(13),
    color: Colors.blue,
    fontWeight: '700',
  },
  progressIndicator: {
    height: 20,
    width: 20,
    backgroundColor: Colors.blue,
    borderRadius: 20 / 2,
  },
});
export default ApplicationCard;
