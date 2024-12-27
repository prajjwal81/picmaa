import React, {useRef, useState} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {RegisterUser, VerifyOTP, loginUser} from '../../API/Auth.Api';
import {useNavigation, useRoute} from '@react-navigation/native';
import {setItem} from '../../utils/asyncStorage';
// 8770821586
const OTP = ({}) => {
  const route = useRoute();
  const {mobile, email, name, login} = route.params;
  const [otp, setOtp] = useState();
  const ref = useRef();
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: otp,
    setValue: setOtp,
  });
  const navigation = useNavigation();

  const continueHandler = async () => {
    // continueHandler ~ isUserVerfied: {"data": {"isVerified": true}, "message": "OTP verified successfully", "statusCode": 200, "success": true}a
    if (!login) {
      let isUserVerfied = await VerifyOTP(mobile, '1234');
      if (isUserVerfied.statusCode == 200) {
        navigation.navigate('MultiAngleCapture');
        setItem(mobile);
      }
      let registerUser = await RegisterUser(name, email, mobile);
      await setItem({
        id: registerUser?.data._id,
        name: registerUser?.data.name,
        email: registerUser?.data.email,
        mobile: registerUser?.data.mobile,
        accessToken: registerUser?.data?.accessToken,
        refreshToken: registerUser?.data?.refreshToken,
        face: '',
      });
    } else {
      const loggedIn = await loginUser(mobile, '1234');
      const user = loggedIn?.data?.user;

      await setItem({
        id: user?._id,
        name: user?.name,
        email: user?.email,
        mobile: user?.mobile,
        accessToken: loggedIn?.data?.accessToken,
        refreshToken: loggedIn?.data?.refreshToken,
        face: user?.faceIdImageUrl,
      });
      navigation.navigate('BottomTabs');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Text>Back</Text>
      </Pressable>
      <Text style={styles.heading}>Enter Your OTP</Text>
      <View style={styles.rowContainer}>
        <CodeField
          ref={ref}
          {...props}
          value={otp}
          onChangeText={input => {
            const numericInput = input.replace(/[^0-9]/g, '');
            setOtp(numericInput);
          }}
          cellCount={4}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete={Platform.select({
            android: 'sms-otp',
            default: 'one-time-code',
          })}
          testID="my-code-input"
          rootStyle={styles.codeFieldRoot}
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.cellText}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />
      </View>
      <Pressable
        style={styles.btnContainer}
        onPress={() => {
          continueHandler();
        }}>
        <Text style={styles.btnTxt}>Continue</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default OTP;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 120,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 24,
    fontWeight: '600',
    marginLeft: '8%',
  },
  para: {
    fontFamily: 'Inter_18pt-BoldItalic',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    width: 64,
    height: 64,
    borderRadius: 10,
    borderColor: '#8E8E93',
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  btnContainer: {
    backgroundColor: '#00897B',
    padding: 18,
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  btnTxt: {
    color: '#FFFFFF',
  },
  codeFieldRoot: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  cell: {
    width: 70,
    height: 70,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    marginRight: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
  cellText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#0A0D14',
  },
  // heading: {
  //   color: '#0A0D14',
  //   fontWeight: '500',
  //   textAlign: 'center',
  //   fontSize: 24,
  // },
  subheading: {
    fontWeight: '500',
    fontSize: 14,
    textAlign: 'center',
    padding: 15,
    color: '#0A0D14',
    opacity: 0.5,
    lineHeight: 20,
  },
  innerText: {
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center',
    fontFamily: 'Poppins',
    marginBottom: 10,
    color: '#0A0D14',
    opacity: 0.5,
  },
  spanStyle: {
    color: '#4285F4',
  },

  btn: {
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
