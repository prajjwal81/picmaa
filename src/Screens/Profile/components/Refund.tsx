import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function RefundPolicy() {
  const navigation = useNavigation();
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
        <Text style={styles.mainTitle}>Your Packages</Text>
        <Text style={styles.mainSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor
        </Text>

        {/* <FlatList
          data={sublistItem?.photos}
          renderItem={renderCategory}
          // keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        /> */}
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
});
