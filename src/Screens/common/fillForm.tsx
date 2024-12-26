import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const FillDetailsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Fill your Details to Proceed</Text>
      <Text style={styles.subtitle}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor
      </Text>

      {/* Form */}
      <View style={styles.form}>
        {/* Full Name */}
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          placeholderTextColor="#A8A8A8"
        />

        {/* Phone Number */}
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          placeholder="+91"
          keyboardType="phone-pad"
          placeholderTextColor="#A8A8A8"
        />

        {/* Home Address */}
        <Text style={styles.label}>Home Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Home Address"
          placeholderTextColor="#A8A8A8"
        />

        {/* Venue Address */}
        <Text style={styles.label}>Venue Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Venue Address"
          placeholderTextColor="#A8A8A8"
        />

        {/* Date */}
        <Text style={styles.label}>Date</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex]}
            placeholder="Select Date"
            placeholderTextColor="#A8A8A8"
          />
          <Icon
            name="calendar-outline"
            size={24}
            color="#A8A8A8"
            style={{position: 'absolute', left: '90%'}}
          />
        </View>

        {/* Time Slot */}
        <Text style={styles.label}>Time Slot</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex]}
            placeholder="Select Time"
            placeholderTextColor="#A8A8A8"
          />
          <Icon
            name="chevron-down-outline"
            size={24}
            color="#A8A8A8"
            style={{position: 'absolute', left: '90%'}}
          />
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: '15%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 30,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  flex: {
    flex: 1,
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
});

export default FillDetailsScreen;
