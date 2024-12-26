import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Pressable,
  Platform,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Banner from './Banner';
import {getEventList} from '../../../API/Home.Api';
import {useNavigation} from '@react-navigation/native';

const Events = () => {
  const [category, setCategory] = useState([]);
  const navigation = useNavigation();

  const renderSubCategory = ({item, eventName}) => {
    const cardHandler = () => {
      navigation.navigate('PhotographersList', {
        eventName: item.name,
        item: eventName,
      });
      console.log('Subcategory:', item.name, 'Event Name:', eventName);
    };
    return (
      <Pressable style={styles.card} onPress={cardHandler}>
        <Image
          source={require('../../../Images/haldi.png')}
          style={styles.cardImage}
        />
        <Text style={styles.cardTitle}>
          {item?.name.charAt(0).toUpperCase() + item?.name.slice(1)}
        </Text>
      </Pressable>
    );
  };

  const renderCategory = ({item}) => (
    <View style={styles.card}>
      <View style={{paddingLeft: '5%'}}>
        <Text style={styles.sectionTitle}>
          {item._id.charAt(0).toUpperCase() + item._id.slice(1)} Photography
        </Text>
        <Text style={styles.sectionSubtitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor.
        </Text>
      </View>

      <FlatList
        data={item.categories}
        renderItem={({item: subItem}) =>
          renderSubCategory({item: subItem, eventName: item._id})
        }
        keyExtractor={item => item._id}
        horizontal
        contentContainerStyle={{backgroundColor: 'white'}}
      />
    </View>
  );

  const mainContent = () => {
    return (
      <View style={{marginBottom: '210%'}}>
        <Banner />
        <FlatList
          data={category}
          renderItem={renderCategory}
          keyExtractor={item => item._id}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    );
  };

  useEffect(() => {
    const getList = async () => {
      const res = await getEventList();
      setCategory(res.data);
      // console.log(JSON.stringify(res.data, null, 2));
    };
    getList();
  }, []);
  return (
    <View style={{}}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

      {/* Categories */}
      <View>
        <FlatList
          data={[1]}
          renderItem={mainContent}
          keyExtractor={(item, idx) => item.toString()}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
    </View>
  );
};

export default Events;
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
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    width: '81%',
  },
  content: {
    padding: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  headerText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 5,
  },
  sectionTitle: {
    fontSize: 22,
    marginVertical: 10,
    fontFamily: 'Roboto-Bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  horizontalList: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#fff',
    // marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'column',
    marginLeft: 10,
  },
  cardImage: {
    width: Dimensions.get('window').width / 2,
    height: 200,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: '8%',
  },
});
