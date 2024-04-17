import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
  Image,
  Animated,
  Platform,
  Dimensions,
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
import status from '../../constans/statusType';
import statusType from '../../constans/statusType';
import {fonts} from '../../helpers/fonst';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
}

const HEADER_HEIGHT = Dimensions.get('window').height * 0.1;

const HomeScreen: React.FC<Props> = ({
  navigation: {navigate, reset, replace},
}) => {
  const [name, setName] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(0); // State untuk melacak item industri yang dipilih
  const [selectedStatus, setSelectedStatus] = useState<number | null>(0); // State untuk melacak item status yang dipilih
  const industry = industryType;
  const status = statusType;

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
      setName(displayName);
    };
    getName();
  }, []);

  const [scrollAnimation] = useState(new Animated.Value(0));
  const [offsetAnimation] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnimation,
      ),
      0,
      1,
    ),
  );
  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });
  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
        <Animated.View
          style={[styles.header, {transform: [{translateY: navbarTranslate}]}]}
          onLayout={event => {
            let {height} = event.nativeEvent.layout;
            setClampedScroll(
              Animated.diffClamp(
                Animated.add(
                  scrollAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                    extrapolateLeft: 'clamp',
                  }),
                  offsetAnimation,
                ),
                0,
                height,
              ),
            );
          }}>
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
              <TextComponent style={styles.initialText}>
                {initials}
              </TextComponent>
            </View>
          </View>

          <View style={{gap: 8, paddingHorizontal: 12}}>
            <TextComponent style={styles.greating} numberOfLines={1}>
              Hi {name}
            </TextComponent>

            <View style={styles.textInput}>
              <Icons
                name={'Search'}
                size={Helper.normalize(15)}
                color={Colors.grey}
              />
              <TextInput
                style={{flex: 1, color: Colors.black}}
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
                <TextComponent
                  style={{
                    fontSize: Helper.fontSize(14),
                    fontFamily: fonts.Regular,
                  }}>
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
                      borderWidth: selectedIndustry === item.id ? 1.2 : 1,
                      borderColor:
                        selectedIndustry === item.id
                          ? Colors.blue
                          : Colors.grey,
                      borderRadius: 16,
                      paddingHorizontal: 8,
                      paddingVertical: 2,
                      alignItems: 'center',
                      marginRight: 4,
                    }}>
                    <TextComponent
                      style={{
                        fontSize: Helper.fontSize(13),
                        color:
                          selectedIndustry === item.id
                            ? Colors.blue
                            : Colors.grey,
                        fontFamily:
                          selectedIndustry === item.id
                            ? fonts.SemiBold
                            : fonts.Regular,
                        marginTop: 2,
                      }}>
                      {item.name}
                    </TextComponent>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Animated.View>

        <Animated.FlatList
          contentInset={{top: HEADER_HEIGHT}}
          contentOffset={{x: 0, y: -HEADER_HEIGHT}}
          bounces={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y: scrollAnimation},
                },
              },
            ],
            {useNativeDriver: true},
          )}
          data={dataApplication}
          renderItem={({item}) => <ApplicationCard data={item} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          contentContainerStyle={
            Platform.OS === 'android'
              ? {
                  paddingTop: HEADER_HEIGHT * 3 - 75,
                  flexGrow: 1,
                  alignItems: 'center',
                  backgroundColor: Colors.lightgrey,
                }
              : {
                  flexGrow: 1,
                  alignItems: 'center',
                  backgroundColor: Colors.lightgrey,
                }
          }
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{height: 100}} />}
        />

        <CustomBottomSheetModal
          ref={bottomSheetRefFilter}
          snapPoints={['35%']}
          onchange={handleSheetPositionChange}
          title="Filter">
          <View style={{gap: 14}}>
            {status.map(item => (
              <TouchableOpacity
                onPress={() => setSelectedStatus(item.id)}
                activeOpacity={0.9}
                key={item.id}
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <TextComponent
                  style={{
                    fontSize: Helper.fontSize(13),
                    fontWeight: selectedStatus === item.id ? '700' : '600',
                  }}>
                  {item.name}
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
                  {selectedStatus === item.id ? (
                    <View
                      style={{
                        backgroundColor: Colors.blue,
                        width: 12,
                        height: 12,
                        borderRadius: 12 / 2,
                      }}
                    />
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </CustomBottomSheetModal>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  imageContainer: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 100,
    backgroundColor: Colors.white,
  },
  initialContainer: {
    width: 34,
    height: 34,
    borderRadius: 34 / 2,
    backgroundColor: Colors.blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialText: {
    fontFamily: fonts.Medium,
    color: Colors.white,
    fontSize: 16,
    marginTop: 2,
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
    width: '60%',
    fontFamily: fonts.SemiBold,
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
