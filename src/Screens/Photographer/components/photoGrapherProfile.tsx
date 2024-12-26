// Import necessary libraries
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getPhotograherDetail} from '../../../API/Photgrapher.Api';
import Button from '../../common/Button';
import {useDispatch, useSelector} from 'react-redux';
import {toggleBottomTab} from '../../../../Redux/Global/GlobalSlice';

const PhotographerProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState([]);
  let {id} = route.params;

  const removeBottomTab = useSelector(state => state?.global?.removeBottomTab);

  useEffect(() => {
    const photographerDetails = async () => {
      const res = await getPhotograherDetail(id);
      setData(res.data);
    };
    photographerDetails();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (removeBottomTab) {
        dispatch(toggleBottomTab(false)); // Tab ko false karna
      }

      return () => {
        if (!removeBottomTab) {
          dispatch(toggleBottomTab(true)); // Tab ko true karna jab back hote hain
        }
      };
    }, [dispatch, removeBottomTab]),
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#000"
            style={styles.backIcon}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <Entypo
            name="share"
            size={24}
            color="#000"
            style={styles.shareIcon}
          />
        </SafeAreaView>

        {/* Profile Section */}
        <View style={styles.profileCard}>
          <Image
            source={require('../../../Images/weddingCouple.png')}
            style={styles.profileImage}
            resizeMode="cover"
          />
          <View style={styles.ratingRow}>
            <Text style={styles.title}>{data?.name}</Text>
            <Text style={styles.rating}>
              ⭐ {data?.rating} ({data?.reviewCount} Review)
            </Text>
          </View>
          <Text style={styles.subTitle}>{data?.city}</Text>
          <View style={styles.line} />
          <View style={styles.ratingRow}>
            <View>
              {data?.specializations?.map((item, idx) => {
                return (
                  <View key={idx} style={{}}>
                    <Text style={styles.info}>{item}</Text>
                  </View>
                );
              }) || []}
            </View>
            <Text style={styles.info}>Experience: 4.5 years</Text>
          </View>
          <View style={styles.line} />
        </View>

        {/* Portfolio Section */}

        <Text style={styles.sectionTitle}>Portfolio</Text>
        <FlatList
          data={data?.portfolio}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={({item}) => (
            <View
              style={[styles.portfolioContainer, {flexDirection: 'column'}]}>
              <Image
                source={{uri: item.photos[0]}}
                style={styles.portfolioImage}
              />

              <Text
                style={{fontSize: 18, textAlign: 'center', fontWeight: '600'}}>
                {item?.folderName}
              </Text>
            </View>
          )}
          numColumns={2}
        />

        {/* About Services */}
        <Text style={[styles.sectionTitle, {marginTop: 20, fontSize: 26}]}>
          About Services
        </Text>
        <Text style={styles.aboutText}>{data?.about}</Text>

        <View style={styles.line} />
        <Text style={[styles.sectionTitle, {marginTop: 20, fontSize: 17}]}>
          Offering
        </Text>

        <Text style={styles.info}>{data?.specializations?.[0]}</Text>

        <Text style={[styles.sectionTitle, {marginTop: 20, fontSize: 17}]}>
          Delivery Time
        </Text>
        <Text style={styles.info}>4 Weeks</Text>

        <View style={styles.line} />

        {/* Reviews Section */}
        <View style={styles.ratingRow}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <Text style={[styles.sectionTitle, {color: '#00897B'}]}>
            Write a Review
          </Text>
        </View>
        <Text style={[styles.rating, {marginVertical: '5%'}]}>
          ⭐ {data?.rating} ({data?.reviewCount} Review)
        </Text>
        {data?.recentReviews?.map(review => {
          return (
            <View key={review._id} style={styles.reviewCard}>
              <View
                style={[
                  styles.ratingRow,
                  {justifyContent: 'flex-start', alignItems: 'center'},
                ]}>
                <Image
                  source={{uri: review?.imageUrl}}
                  style={styles.profileCircle}
                />
                <View>
                  <Text style={styles.reviewerName}>
                    {review?.reviewer?.name}
                  </Text>
                  <Text style={styles.reviewDate}>{review.createdAt}</Text>
                </View>
                <Text style={[styles.rating, {marginLeft: 15, top: '-3%'}]}>
                  ⭐ {review?.stars}
                </Text>
              </View>
              <Text style={styles.reviewText}>{review?.comment}</Text>
            </View>
          );
        })}

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View All Reviews</Text>
        </TouchableOpacity>
      </ScrollView>

      <View
        style={{
          height: '100%',
          position: 'absolute',
          width: '100%',
          top: '94%',
        }}>
        <Button
          text={'See All Packages'}
          press={() => {
            navigation.navigate('Packages', {id: id});
          }}
          width={'100%'}
          height={'6%'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // padding: 16,
  },
  backIcon: {
    marginLeft: 10,
  },
  shareIcon: {
    marginRight: 10,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 8,
  },
  profileImage: {
    width: '100%',
    height: Dimensions.get('window').height / 3,
    borderRadius: 10,
    marginVertical: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
    fontWeight: '500',
  },
  ratingRow: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
    width: '100%',
  },
  rating: {
    fontSize: 20,
    color: '#444',
  },
  info: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  portfolioContainer: {
    flexDirection: 'column',
    width: '50%',
  },
  portfolioImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  reviewCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  reviewDate: {
    fontSize: 12,
    color: '#aaa',
    marginLeft: 10,
    marginTop: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '300',
    marginTop: 10,
  },
  button: {
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: '30%',
    borderWidth: 1,
    borderColor: '00897B',
  },
  buttonText: {
    color: '#00897B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: 'black',
    alignSelf: 'center',
    marginVertical: '5%',
  },
  profileCircle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 10,
  },
});

export default PhotographerProfile;
