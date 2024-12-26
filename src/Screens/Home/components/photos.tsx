import React from 'react';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Share from '../../../Images/svg/share.svg';
const Photos = () => {
  //   const categories = [
  //     {
  //       id: 1,
  //       title: 'Haldi Photos',
  //       image: require('../../../Images/haldi.png'),
  //     },
  //     {
  //       id: 2,
  //       title: 'Mehndi Photos',
  //       image: require('../../../Images/mehendi.png'),
  //     },
  //     {
  //       id: 3,
  //       title: 'Engagement Photos',
  //       image: require('../../../Images/engagement.png'),
  //     },
  //     {
  //       id: 4,
  //       title: 'Marriage Photos',
  //       image: require('../../../Images/wedding.png'),
  //     },
  //   ];

  //   const renderCategory = ({item}) => {
  //     return (
  //       <TouchableOpacity style={styles.categoryContainer}>
  //         <Image
  //           source={item?.image}
  //           style={styles.categoryImage}
  //           resizeMode="cover"
  //         />
  //         <Text style={styles.categoryText}>{item?.title}</Text>
  //       </TouchableOpacity>
  //     );
  //   };

  return (
    <View style={styles.container}>
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
      </View>

      <View style={styles.content}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.mainTitle}>My Photos</Text>
          <View style={styles.btnContainer}>
            <Share />
            <Text style={styles.btnText}>Share </Text>
          </View>
        </View>

        {/* <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        /> */}
      </View>
    </View>
  );
};

export default Photos;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
  grid: {
    alignItems: 'center',
  },
  categoryContainer: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  categoryImage: {
    width: '100%',
    height: Dimensions.get('window').height / 4.9,
    borderRadius: 10,
  },
  categoryText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: 'black',
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
});
