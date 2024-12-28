import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';

const FillDetailsScreen = ({formData, setFormData, setModal}) => {
  const handleChange = (field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    if (!fullName || !phoneNumber) {
      Alert.alert('Full Name and Phone Number are required.');
      return;
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Entypo
          name="circle-with-cross"
          size={30}
          color="#000"
          style={styles.backIcon}
          onPress={() => {
            setModal(false);
          }}
        />
        <Text style={styles.title}>Fill your Details to Proceed</Text>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Full Name */}
          <Text style={styles.label}>Full Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Full Name"
            placeholderTextColor="#A8A8A8"
            value={fullName}
            onChangeText={text => handleChange('fullName', text)}
          />

          {/* Phone Number */}
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            placeholder="+91"
            keyboardType="phone-pad"
            placeholderTextColor="#A8A8A8"
            value={phoneNumber}
            onChangeText={text => handleChange('phoneNumber', text)}
          />

          {/* Home Address */}
          <Text style={styles.label}>Home Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Home Address"
            placeholderTextColor="#A8A8A8"
            value={homeAddress}
            onChangeText={text => handleChange('homeAddress', text)}
          />

          {/* Venue Address */}
          <Text style={styles.label}>Venue Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Venue Address"
            placeholderTextColor="#A8A8A8"
            value={venueAddress}
            onChangeText={text => handleChange('venueAddress', text)}
          />

          {/* Date */}
          <Text style={styles.label}>Date</Text>
          <Pressable
            style={styles.input}
            onPress={() => handleChange('openDatePicker', !openDatePicker)}>
            <Text style={styles.dateText}>{date?.toLocaleDateString()}</Text>
            <Icon
              name="calendar-outline"
              size={24}
              color="#A8A8A8"
              style={{position: 'absolute', left: '90%'}}
            />
          </Pressable>

          {/* Date Picker */}
          <DatePicker
            modal
            open={openDatePicker}
            date={date}
            onConfirm={date => {
              handleChange('date', date);
              handleChange('openDatePicker', false);
            }}
            onCancel={() => handleChange('openDatePicker', false)}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.proceedButton} onPress={handleSubmit}>
          <Text style={styles.proceedText}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: '15%',
    paddingBottom: '15%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    backgroundColor: '#D9D9D90',
    borderRadius: 10,
    padding: 20,
    fontSize: 14,
    marginBottom: 15,
    color: '#000',
  },
  proceedButton: {
    backgroundColor: '#00897B',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  proceedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backIcon: {
    position: 'absolute',
    left: '98%',
    top: '3%',
  },
  dateText: {
    fontSize: 14,
    color: '#A8A8A8',
  },
});

export default FillDetailsScreen;
