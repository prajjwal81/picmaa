import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import Camera from '../../Images/svg/Camera.svg';
import Profile from '../../Images/svg/profile.svg';
import {useNavigation} from '@react-navigation/native';
const PhotographerNumber = () => {
  const navigation = useNavigation();

  const continueHandler = () => {
    navigation.navigate('ConfirmPhotographerScreen');
  };
  return (
    <SafeAreaView style={{}}>
      <Text style={styles.subHeading2}>Enter Your Photographer's Details</Text>
      <View style={styles.inputRowContainer}>
        {/* <Profile /> */}
        <TextInput
          placeholder="Full Name"
          style={styles.inputContainer}
          placeholderTextColor={'black'}
        />
      </View>

      <View style={styles.inputRowContainer}>
        {/* <Profile /> */}
        <TextInput
          placeholder="Phone Number"
          style={styles.inputContainer}
          placeholderTextColor={'black'}
        />
      </View>

      <Pressable style={styles.btnContainer} onPress={continueHandler}>
        <Text style={styles.btnTxt}>Continue</Text>
      </Pressable>

      <Pressable
        style={[
          styles.btnContainer,
          {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: '#00897B',
          },
        ]}>
        <Text style={[styles.btnTxt, {color: '#00897B'}]}>
          I Don’t Have Photographer’s Number
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PhotographerNumber;

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontFamily: 'Sansation',
    fontWeight: '700',
    fontSize: 22,
  },
  subHeading: {
    fontFamily: 'Roboto',
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  subHeading2: {
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
    marginTop: '20%',
    marginBottom: '10%',
  },
  btnContainer: {
    backgroundColor: '#00897B',
    padding: 18,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginHorizontal: 20,
  },
  btnTxt: {
    color: '#FFFFFF',
  },
  inputRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    marginHorizontal: 20,
    padding: 18,
    marginVertical: 15,
    borderRadius: 18,
    borderColor: '#00000040',
    shadowColor: '##00000040',
    borderWidth: 1,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    // Shadow for Android
    elevation: 5,
  },
  inputContainer: {
    marginLeft: 10,
  },
});
