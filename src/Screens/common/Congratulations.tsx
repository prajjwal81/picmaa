import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const CongratulationsScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background Circles */}
      <View style={[styles.circle, styles.topCircle]} />
      <View style={[styles.circle, styles.bottomCircle]} />

      {/* Content */}
      <View style={styles.contentContainer}>
        <Icon
          name="check-circle"
          size={64}
          color="#4CAF50"
          style={styles.icon}
        />
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.subtitle}>Your Package Has Been Booked</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Continue Shipping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#CDEDEA',
    borderRadius: width,
    width: width * 1.5,
    height: width * 1.5,
  },
  topCircle: {
    top: -height * 0.3,
    left: -width * 0.5,
  },
  bottomCircle: {
    bottom: -height * 0.3,
    right: -width * 0.5,
  },
  contentContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CongratulationsScreen;
