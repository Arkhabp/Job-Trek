import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';

import Colors from '../../constans/colors';
import PoppinsText from '../text';
import Helper from '../../helpers/helper';

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
}

const ApplicationCard: React.FC<Props> = ({data}) => {
  return (
    <>
      <TouchableOpacity
        key={data.id}
        style={{marginTop: 4, marginHorizontal: 2}}
        activeOpacity={0.8}>
        <View style={[styles.container]}>
          <View style={styles.containerStatus}>
            <PoppinsText style={styles.TextStatus}>{data.status}</PoppinsText>
          </View>
          <PoppinsText style={styles.TextCompany} numberOfLines={1}>
            {data.companyName}
          </PoppinsText>
          <PoppinsText style={styles.TextDetail}>
            {data.position}
            {'\n'}
            {data.employmentType}
            {'\n'}
            {data.portal}
          </PoppinsText>

          <View style={styles.line} />

          <View style={{flexDirection: 'row', gap: 4}}>
            <View style={styles.markProgress} />
            <PoppinsText style={styles.progress}>
              {data.offering}
              {'\n'}
              {data.progressDate}
            </PoppinsText>
          </View>

          <TouchableOpacity activeOpacity={0.8}>
            <PoppinsText style={styles.buttonEdit}>Update</PoppinsText>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
});
export default ApplicationCard;
