import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');

const ConfirmPhotographerScreen = () => {
  const navigation = useNavigation();
  const details = [
    {id: '1', label: 'Wedding Photography'},
    {id: '2', label: 'Exp: 4.5 years'},
    {id: '3', label: 'Location: New Delhi'},
    {id: '4', label: 'Hired On: 24 Nov 2024'},
  ];

  const renderDetailItem = ({item}) => (
    <View style={styles.detailItem}>
      <Text style={styles.detailText}>{item.label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Confirm your Photographer’s Details</Text>

      {/* Photographer Details Card */}
      <View style={styles.card}>
        <Image
          source={require('../../Images/perosn.png')}
          style={styles.profileImage}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingHorizontal: '5%',
          }}>
          <Text style={styles.photographerName}>Prashant Sharma</Text>
          <Text style={styles.rating}>⭐ 4.9 (47 reviews)</Text>
        </View>

        {/* Details Section with FlatList */}
        <FlatList
          data={details}
          keyExtractor={item => item.id}
          renderItem={renderDetailItem}
          numColumns={2}
          columnWrapperStyle={styles.detailRow}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Action Buttons */}
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => {
          // navigation.navigate('MultiAngleCapture');
        }}>
        <Text style={styles.primaryButtonText}>
          Yes, This is My Photographer
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>
          No, This is Not My Photographer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: '30%',
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#2C7A7B',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: width * 0.8,
    height: width * 0.6,
    borderRadius: 10,
    marginBottom: 15,
  },
  photographerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  rating: {
    fontSize: 12,
    color: '#FFD700',
    marginBottom: 15,
  },
  detailRow: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailItem: {
    backgroundColor: '#285E61',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '48%',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: '#2C7A7B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2C7A7B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#2C7A7B',
    fontWeight: '600',
  },
});

export default ConfirmPhotographerScreen;
