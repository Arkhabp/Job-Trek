import React, {useEffect, useRef, useState} from 'react';
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
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {handleSignOut} from '../../store/redux/action/auth';

import {RootStackParamList} from '../../navigations/types';
import {useDispatch, useSelector} from 'react-redux';
import TextComponent from '../../components/text';
import Helper from '../../helpers/helper';
import Colors from '../../constans/colors';
import Icons from '../../components/icon';
import ApplicationCard from '../../components/ApplicationCard';
import {RootState} from '../../store';
import industryType from '../../constans/industryType';
import CustomBottomSheetModal from '../../components/BottomSheet/customBottomSheet';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useBottomSheetBackHandler} from '../../components/BottomSheet/BackHandler';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const HomeScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const [name, setName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null); // State untuk melacak item industri yang dipilih
  const industry = industryType;
  const dispatch = useDispatch();

  const dataApplication = useSelector(
    (state: RootState) => state?.application.application.data,
  );

  const bottomSheetRefFilter = useRef<BottomSheetModal>(null);

  const {handleSheetPositionChange} =
    useBottomSheetBackHandler(bottomSheetRefFilter);

  const bottomSheetFilterHandler = () => {
    return bottomSheetRefFilter.current?.present();
  };

  const initials = Helper.getInitials(name);
  useEffect(() => {
    const getName = async () => {
      const displayName: any = await AsyncStorage.getItem('@displayName');
      setName('Muhammad Arkhab Purnama Agdana');
    };
    getName();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/Images/Logo.png')}
            style={{
              width: 94,
              height: 56,
              resizeMode: 'contain',
            }}
          />

          <View style={styles.initialContainer}>
            <TextComponent style={styles.initialText}>{initials}</TextComponent>
          </View>
        </View>

        <View style={{gap: 10, paddingHorizontal: 12}}>
          <TextComponent
            style={[styles.greating, {fontFamily: 'Poppins-SemiBold'}]}
            numberOfLines={1}>
            Hi {name}
          </TextComponent>

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
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={bottomSheetFilterHandler}>
            <View style={{flexDirection: 'row'}}>
              <Icons
                name={'Filter'}
                size={Helper.normalize(16)}
                color={Colors.black}
              />
              <TextComponent style={{fontSize: Helper.fontSize(14)}}>
                Filter
              </TextComponent>
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
                  <TextComponent
                    style={{
                      fontSize: Helper.fontSize(14),
                      color:
                        selectedIndustry === item.id
                          ? Colors.blue
                          : Colors.grey,
                      fontWeight: selectedIndustry === item.id ? '900' : '700',
                    }}>
                    {item.name}
                  </TextComponent>
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

        <CustomBottomSheetModal
          ref={bottomSheetRefFilter}
          snapPoints={['25%']}
          onchange={handleSheetPositionChange}
          title="Filter">
          <View style={{gap: 14}}>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TextComponent
                style={{fontSize: Helper.fontSize(13), fontWeight: '700'}}>
                Success
              </TextComponent>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: Colors.blue,
                    width: 12,
                    height: 12,
                    borderRadius: 12 / 2,
                  }}
                />
              </View>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TextComponent
                style={{fontSize: Helper.fontSize(13), fontWeight: '600'}}>
                Fail
              </TextComponent>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TextComponent
                style={{fontSize: Helper.fontSize(13), fontWeight: '600'}}>
                On Process
              </TextComponent>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
            <View
              style={{justifyContent: 'space-between', flexDirection: 'row'}}>
              <TextComponent
                style={{fontSize: Helper.fontSize(13), fontWeight: '600'}}>
                Registered
              </TextComponent>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: Colors.blue,
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </View>
          </View>
        </CustomBottomSheetModal>
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
  imageContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  initialContainer: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {fontWeight: 'bold', color: Colors.white},
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
    width: '60%',
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
