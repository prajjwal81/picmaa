import {
  Dimensions,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getNumber} from '../../../../src/API/Profile.Api';
import {getItem} from '../../../../src/utils/asyncStorage';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Share from '../../../Images/svg/share.svg';

const SharedNumbers = () => {
  const [data, setData] = useState([1, 2, 3]);
  const navigation = useNavigation();

  useEffect(() => {
    const apiCall = async () => {
      const user = await getItem();
      const res = await getNumber(user.accessToken);
      setData(res.data);
    };
    apiCall();
  });

  const deleteHandler = () => {};
  return (
    <View>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Ionicons
            name="arrow-back"
            size={30}
            color="#fff"
            style={{right: Dimensions.get('window').width / 6}}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Entypo
            name="camera"
            size={25}
            color="#FFF"
            style={{top: Platform.OS == 'android' ? 5 : 1}}
          />
          <Text style={styles.headerTitle}>Pix Studio Pro</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.mainTitle}>All Numbers</Text>
          {/* <Pressable style={styles.btnContainer} onPress={() => {}}>
            <Share />
            <Text style={styles.btnText}>Filters </Text>
          </Pressable> */}
        </View>
      </View>

      <ScrollView>
        <SafeAreaView style={{flex: 1}}>
          {data.map((item, idx) => {
            return (
              <View style={styles.box} key={idx}>
                <Text
                  style={{
                    color: 'rgba(108, 108, 108, 1)',
                    fontSize: 15,
                    fontFamily: 'Inter_28pt-SemiBold',
                  }}>
                  MOB: +91- 91475923847
                </Text>
                <AntDesign
                  name="delete"
                  size={30}
                  color="rgba(255, 0, 0, 1)"
                  onPress={() => {
                    deleteHandler();
                  }}
                  style={{right: '25%'}}
                />
              </View>
            );
          })}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default SharedNumbers;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    padding: 20,
    alignItems: 'center',
    paddingTop: Platform.OS == 'android' ? '10%' : '20%',
  },
  headerTitle: {
    fontSize: 26,
    color: '#FFFFFF',
    marginBottom: 5,
    fontFamily: 'Sansation-Bold',
    marginLeft: 15,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'Roboto',
    letterSpacing: 0.6,
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  btnContainer: {
    backgroundColor: 'rgba(0, 137, 123, 1)',
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '3%',
    borderRadius: 10,
    flexDirection: 'row',
  },
  btnText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
    marginLeft: 10,
  },
  box: {
    width: '95%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: '5%',
    flexDirection: 'row',
    borderColor: 'rgba(228, 228, 228, 1)',
    borderWidth: 2,
    alignItems: 'center',
    marginTop: '3%',
  },
});
