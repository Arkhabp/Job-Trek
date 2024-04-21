import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Alert,
  TextInput,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import TextComponent from '../../components/text';
import Colors from '../../constans/colors';
import {Formik} from 'formik';
import StyledInput from '../../components/TextInput';
import {fonts} from '../../helpers/fonst';
import Helper from '../../helpers/helper';
import Icons from '../../components/icon';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/Buttons/defaultButton';
import {useAppDispatch, useAppSelector} from '../../../hook';
import {types} from '../../constans/editApplication.constan';
import {RootState} from '../../store';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {
  handleDeleteApplication,
  handleEditApplication,
} from '../../store/redux/action/application';

type DetailAppRouteProp = RouteProp<
  {
    DetailApp: {AppId: number};
  },
  'DetailApp'
>;

const DetailApplicationScreen: React.FC<{route: DetailAppRouteProp}> = ({
  route,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const companyNameRef = useRef<TextInput>(null);
  const positionRef = useRef<TextInput>(null);
  const jobSeekerPortalRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const {AppId} = route.params;
  // State untuk memantau fokus input
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const state = useAppSelector(
    (state: RootState) => state?.application.updateApplication,
  );

  const onFocusedHandler = (inputKey: string) => {
    setFocusedInput(inputKey);
    dispatch({type: types.ON_FOUCUS_STATE_TRUE});
  };

  const editState = useAppSelector(
    (state: RootState) => state?.editApplication.data,
  );
  const dataApplication = useAppSelector(
    (state: RootState) => state?.application.application.data,
  );
  const applicationData = dataApplication.find(
    (data: {id: number}) => data.id === AppId,
  );

  const onSubmit = (values: {
    companyName: string;
    industry: string;
    position: string;
    employementType: string;
    status: string;
    jobSeekerPortal: string;
    note: string;
  }) => {
    const {
      companyName,
      industry,
      position,
      employementType,
      status,
      jobSeekerPortal,
      note,
    } = values;

    const dataEdit = {
      companyName,
      industry,
      position,
      employementType,
      status,
      jobSeekerPortal,
      note,
    };

    if (editState) {
      dispatch(handleEditApplication(dataEdit, navigation));
    } else {
      dispatch(handleDeleteApplication(dataEdit, navigation));
    }
  };

  useEffect(() => {
    if (!editState) {
      companyNameRef.current?.blur();
      positionRef.current?.blur();
      jobSeekerPortalRef.current?.blur();
      noteRef.current?.blur();
      setFocusedInput(null);
    }
  }, [editState]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (navigation.isFocused()) {
          dispatch({type: types.ON_FOUCUS_STATE_FALSE});
          navigation.goBack();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            companyName: applicationData.companyName,
            industry: applicationData.industry,
            position: applicationData.position,
            employementType: applicationData.employmentType,
            status: applicationData.status,
            jobSeekerPortal: applicationData.portal,
            note: applicationData.note,
          }}
          onSubmit={onSubmit}>
          {formikProps => (
            <React.Fragment>
              <StyledInput
                formikProps={formikProps}
                formikKey="companyName"
                placeholder="Company Name"
                onFocus={() => onFocusedHandler('companyName')}
                onBlur={() => setFocusedInput(null)}
                ref={companyNameRef}
                styleOnFocused={[
                  styles.input,
                  focusedInput === 'companyName' && styles.focusedInput,
                ]}
                value={formikProps.values.companyName}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="industry"
                onpress={() => {
                  onFocusedHandler('industry');
                  navigation.navigate('Industry');
                }}
                styleOnFocused={[styles.input]}
                valueBottonInput={formikProps.values.industry}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="position"
                placeholder="Position"
                onFocus={() => onFocusedHandler('position')}
                caretHidden={!editState}
                ref={positionRef}
                styleOnFocused={[
                  styles.input,
                  focusedInput === 'position' && styles.focusedInput,
                ]}
                value={formikProps.values.position}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="employementType"
                onpress={() => Alert.alert('ET')}
                styleOnFocused={[styles.input]}
                valueBottonInput={formikProps.values.employementType}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="status"
                onpress={() => Alert.alert('Status')}
                styleOnFocused={[styles.input]}
                valueBottonInput={formikProps.values.status}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="jobSeekerPortal"
                placeholder="Job Seeker Portal"
                onFocus={() => onFocusedHandler('jobSeekerPortal')}
                caretHidden={!editState}
                ref={jobSeekerPortalRef}
                styleOnFocused={[
                  styles.input,
                  focusedInput === 'jobSeekerPortal' && styles.focusedInput,
                ]}
                value={formikProps.values.jobSeekerPortal}
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="note"
                placeholder="Note"
                addStyle={{height: 90, textAlignVertical: 'top'}}
                multipleLine={true}
                onFocus={() => onFocusedHandler('note')}
                caretHidden={!editState}
                ref={noteRef}
                styleOnFocused={[
                  styles.input,
                  focusedInput === 'note' && styles.focusedInput,
                ]}
                value={formikProps.values.note}
              />

              <View
                style={{
                  marginTop: 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TextComponent
                    style={{
                      fontFamily: fonts.SemiBold,
                      fontSize: Helper.fontSize(14),
                    }}>
                    Progress
                  </TextComponent>

                  <TouchableOpacity activeOpacity={0.8}>
                    <Icons name="Edit" size={18} color={Colors.blue} />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    borderColor: Colors.blue,
                    borderWidth: 1,
                    borderRadius: 6,
                    padding: 10,
                  }}>
                  <View style={{flexDirection: 'row', gap: 4}}>
                    <View
                      style={[
                        styles.markProgress,
                        {backgroundColor: Colors.blue},
                      ]}
                    />
                    <TextComponent style={styles.Textprogress}>
                      Registered
                      {'\n'}
                      06-02-2024
                    </TextComponent>
                  </View>
                </View>
              </View>

              {state?.isLoading ? (
                <DefaultButton
                  color="primary"
                  type={editState ? 'solid' : 'delete'}
                  onPress={() => formikProps.handleSubmit()}
                  size="medium"
                  borderRadius={Helper.normalize(6)}
                  style={{marginTop: 70, height: 45}}>
                  <ActivityIndicator />
                </DefaultButton>
              ) : (
                <DefaultButton
                  color="primary"
                  type={editState ? 'solid' : 'delete'}
                  onPress={() => formikProps.handleSubmit()}
                  size="medium"
                  borderRadius={Helper.normalize(6)}
                  style={{marginTop: 70}}
                  iconName={editState ? 'Save' : 'Delete'}>
                  {editState ? 'Save' : 'Delete'}
                </DefaultButton>
              )}
            </React.Fragment>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  markProgress: {
    backgroundColor: Colors.black,
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    marginTop: 1,
  },
  Textprogress: {fontFamily: fonts.Regular, fontSize: Helper.fontSize(12)},
  input: {
    borderColor: Colors.grey,
  },
  focusedInput: {
    borderColor: Colors.blue,
    borderWidth: 1.2,
  },
});

export default DetailApplicationScreen;
