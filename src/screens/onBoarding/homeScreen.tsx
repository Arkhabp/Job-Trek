import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {handleSignOut} from '../../store/redux/action/auth';

import {RootStackParamList} from '../../navigations/types';
import {useDispatch, useSelector} from 'react-redux';
import PoppinsText from '../../components/text';
import Helper from '../../helpers/helper';
import Colors from '../../constans/colors';
import Icons from '../../components/icon';
import ApplicationCard from '../../components/ApplicationCard';
import {RootState} from '../../store';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const HomeScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const [name, setName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null); // State untuk melacak item industri yang dipilih
  const dispatch = useDispatch();

  useEffect(() => {
    const getName = async () => {
      const displayName: any = await AsyncStorage.getItem('@displayName');
      setName(displayName);
    };
    getName();
  }, []);

  const industry = [
    {
      id: 1,
      name: 'Mining',
    },
    {
      id: 2,
      name: 'Construction',
    },
    {
      id: 4,
      name: 'Manufacturing',
    },
    {
      id: 5,
      name: 'Manufacturing',
    },
    {
      id: 6,
      name: 'Manufacturing',
    },
    {
      id: 7,
      name: 'Manufacturing',
    },
    {
      id: 8,
      name: 'Manufacturing',
    },
  ];

  const dataApplication = useSelector(
    (state: RootState) => state?.application.application.data,
  );

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
        <View style={{gap: 10, paddingHorizontal: 12}}>
          <PoppinsText style={styles.greating}>Hi {name}</PoppinsText>

          <View style={styles.textInput}>
            <Icons
              name={'Search'}
              size={Helper.normalize(15)}
              color={Colors.grey}
            />
            <TextInput
              style={{flex: 1}}
              placeholderTextColor={Colors.grey}
              placeholder="Search"
              onChangeText={text => ''}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 6,
            alignItems: 'center',
            marginTop: 12,
            paddingLeft: 12,
            paddingBottom: 10,
          }}>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={{flexDirection: 'row'}}>
              <Icons
                name={'Filter'}
                size={Helper.normalize(16)}
                color={Colors.black}
              />
              <PoppinsText style={{fontSize: Helper.fontSize(14)}}>
                Filter
              </PoppinsText>
            </View>
          </TouchableOpacity>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 12}}>
            {industry.map(item => (
              <TouchableOpacity
                activeOpacity={0.8}
                key={item.id}
                onPress={() => setSelectedIndustry(item.id)}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor:
                      selectedIndustry === item.id ? Colors.blue : Colors.grey,
                    borderRadius: 16,
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    alignItems: 'center',
                    marginRight: 4,
                  }}>
                  <PoppinsText
                    style={{
                      fontSize: Helper.fontSize(14),
                      color:
                        selectedIndustry === item.id
                          ? Colors.blue
                          : Colors.grey,
                      fontWeight: selectedIndustry === item.id ? '900' : '700',
                    }}>
                    {item.name}
                  </PoppinsText>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <FlatList
          data={dataApplication}
          renderItem={({item}) => <ApplicationCard data={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            backgroundColor: Colors.lightgrey,
          }}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 100}} />}
        />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: 14,
    flex: 1,
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
  greating: {
    fontSize: Helper.fontSize(16),
    fontWeight: '700',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: Helper.normalize(8),
    paddingLeft: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: Helper.normalize(36),
  },
});

export default HomeScreen;
