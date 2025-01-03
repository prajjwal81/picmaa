import {
  Dimensions,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getItem} from '../../../utils/asyncStorage';
import {getEventListOnType} from '../../../../src/API/Profile.Api';

export default function TypeOfPackages() {
  const route = useRoute();
  const labels = route.params;
  const label = labels.split(' ')[0];
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      let user = await getItem();
      let res = await getEventListOnType(user?.accessToken, label);
      // setData(res.data);
      console.log('🚀 ~ apiCall ~ res:', res);
    };
    apiCall();
  }, []);

  const renderCategory = item => {
    return (
      <TouchableOpacity style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{item?.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
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
        <Text style={styles.headerSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.mainTitle}>{label} Packages</Text>
        <Text style={styles.mainSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>

        {data.length == 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              top: '100%',
            }}>
            <Text>No Data Available</Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={renderCategory}
            // keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
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
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '81%',
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 24,
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
  categoryContainer: {
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: '95%',
  },

  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
  },
});
