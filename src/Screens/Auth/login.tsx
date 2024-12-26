import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../common/Button';
import CheckBox from '@react-native-community/checkbox';
import Google from '../../Images/svg/google.svg';
import {OTP, RegisterUser, VerifyOTP} from '../../API/Auth.Api';
import {useNavigation} from '@react-navigation/native';
import {InterSemiBold, SansationBold} from '../../utils/fonts';

const Login = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [login, setLogin] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('8770821586');

  const modalHandler = change => {
    setModal(prev => !prev);

    if (change) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const continueHandler = async () => {
    let flag = !login && 'signup';
    let otp = await OTP(mobile, flag);
    if (!login) {
      if (otp.statusCode == 200 && otp.message == 'OTP sent successfully') {
        modalHandler(false);
        navigation.navigate('Otp', {name, email, mobile, login});
      }
      if (otp.message == 'User already exists!') {
        setMessage(otp.message);
      }
    } else {
      if (otp.statusCode == 200 && otp.message == 'OTP sent successfully') {
        modalHandler(false);
        navigation.navigate('Otp', {
          name: null,
          email: null,
          mobile: mobile,
          login,
        });
      }
    }
  };
  // 8545808107
  return (
    <View style={styles.container}>
      <Image
        source={require('../../Images/splashScreen.png')}
        style={{flex: 1, position: 'absolute'}}
      />

      <View style={{paddingHorizontal: '3%', paddingVertical: '5%'}}>
        <Text style={styles.heading}>Pix Studio Pro</Text>
        <Text style={[styles.text]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua
        </Text>
      </View>

      <Button
        press={() => modalHandler(false)}
        text={'Get Started'}
        height={'0'}
        width={'0'}
      />

      <View style={{marginTop: '2%'}}>
        <Text style={styles.text}>
          Already Have an Account
          <Pressable
            onPress={() => {
              modalHandler(true);
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'rgba(0, 137, 123, 1)',
                left: 10,
                top: Platform.OS === 'android' ? 5 : 2,
              }}>
              {' '}
              Login{' '}
            </Text>
          </Pressable>
        </Text>
      </View>

      <Modal visible={modal} animationType="slide" transparent>
        <Pressable
          style={styles.fakeHeight}
          onPress={() => {
            setModal(false);
          }}
        />
        <LinearGradient
          colors={['rgba(0, 137, 123, 1)', 'rgba(255, 255, 255, 1)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.modalContainer}>
          <View style={styles.container2}>
            <View style={styles.line} />
            {login ? (
              <Text style={styles.title}>Welcome Back!</Text>
            ) : (
              <Text style={styles.title}>Sign up in Pix Studio Pro</Text>
            )}

            <Text style={styles.subtitle}>{message}</Text>

            {login ? (
              ''
            ) : (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#8E8E8E"
                    value={name}
                    onChangeText={setName}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor="#8E8E8E"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </>
            )}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter your number"
                placeholderTextColor="#8E8E8E"
                keyboardType="phone-pad"
                value={mobile}
                onChangeText={setMobile}
              />
            </View>

            <Pressable
              style={styles.continueButton}
              onPress={() => {
                continueHandler();
              }}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </Pressable>

            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: '5%',
              }}>
              <View style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}>
                <CheckBox
                  value={isChecked}
                  onValueChange={setIsChecked}
                  tintColors={{true: '#2E7D6F', false: '#8E8E8E'}}
                />
              </View>
              <Text style={styles.checkboxText}>
                Agree With Terms and Conditions
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <View style={styles.checkboxContainer}></View>

              <Text style={styles.orText}>Or Continue With</Text>

              <View style={styles.socialContainer}>
                <Pressable style={styles.socialButton}>
                  <Google />
                </Pressable>
                <Pressable style={styles.socialButton}>
                  <Image
                    source={{
                      uri: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
                    }}
                    style={styles.socialIcon}
                  />
                </Pressable>
              </View>
            </View>
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', paddingTop: '95%'},
  container2: {
    flex: 1,
    padding: 20,
  },
  line: {
    width: '30%',
    backgroundColor: 'white',
    height: 7,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: '10%',
  },
  heading: {
    fontFamily: SansationBold,
    fontSize: 32,
    textAlign: 'center',
    color: 'black',
    // fontWeight: '700',
  },
  text: {
    fontSize: Platform.OS === 'android' ? 11 : 15,
    // fontWeight: '400',
    textAlign: 'center',
    fontFamily: InterSemiBold,
    color: 'black',
  },

  modalContainer: {flex: 1},
  fakeHeight: {
    height: '20%',
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginBottom: 15,
    paddingHorizontal: 15,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#000000',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#2E7D6F',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 10,
    marginBottom: 20,
    elevation: 5,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '15%',
  },
  checkboxText: {
    fontSize: 14,
    color: '#000000',
    marginLeft: '2%',
  },
  orText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '400',
    textDecorationLine: 'underline',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: '10%',
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 3,
    padding: 15,
    marginTop: '5%',
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
