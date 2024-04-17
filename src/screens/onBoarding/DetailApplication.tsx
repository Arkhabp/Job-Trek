import React from 'react';
import {SafeAreaView, View, StyleSheet, Alert} from 'react-native';
import TextComponent from '../../components/text';
import Colors from '../../constans/colors';
import {Formik} from 'formik';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import StyledInput from '../../components/TextInput';
import {height, width} from '@fortawesome/free-brands-svg-icons/fa42Group';
import {fonts} from '../../helpers/fonst';
import Helper from '../../helpers/helper';
import Icons from '../../components/icon';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import DefaultButton from '../../components/Buttons/defaultButton';

const DetailApplicationScreen = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            companyName: '',
            industry: '',
            position: '',
            employementType: '',
            status: '',
            jobSeekerPortal: '',
            note: '',
          }}
          onSubmit={() => console.log('adasds')}>
          {formikProps => (
            <React.Fragment>
              <StyledInput
                formikProps={formikProps}
                formikKey="companyName"
                placeholder="Company Name"
                value=""
              />

              <StyledInput
                formikProps={formikProps}
                formikKey="industry"
                placeholder="Industry"
                onpress={() => Alert.alert('Industry')}
                value=""
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="position"
                placeholder="Position"
                value=""
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="employementType"
                placeholder="Employement Type"
                onpress={() => Alert.alert('ET')}
                value=""
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="status"
                placeholder="Status"
                onpress={() => Alert.alert('Status')}
                value=""
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="jobSeekerPortal"
                placeholder="Job Seeker Portal"
                value=""
              />
              <StyledInput
                formikProps={formikProps}
                formikKey="note"
                placeholder="Note"
                addStyle={{height: 90, textAlignVertical: 'top'}}
                multipleLine={true}
                value=""
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

              <DefaultButton
                color="primary"
                type="solid"
                textColor={Colors.white}
                onPress={() => ''}
                size="medium"
                borderRadius={Helper.normalize(6)}
                style={{marginTop: 70}}>
                Update
              </DefaultButton>
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
});

export default DetailApplicationScreen;
