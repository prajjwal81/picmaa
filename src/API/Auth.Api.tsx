import axios from 'axios';
import {ADD_FACE_ID, LOGIN, Register_User, Verify_OTP, _OTP} from './index';

export const loginUser = async (mobile, otp) => {
  try {
    const res = await axios.post(`${LOGIN}`, {mobile, otp});
    return res.data;
  } catch (error) {
    console.error('Error in OTP API call:', error?.message);
    throw error;
  }
};

export const RegisterUser = async (name, email, mobile) => {
  try {
    const res = await axios.post(`${Register_User}`, {
      name,
      email,
      mobile,
      role: 'user',
      isEmailVerified: true,
      isMobileVerified: true,
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const OTP = async (mobile, flag) => {
  try {
    const res = await axios.post(`${_OTP}`, {mobile, flag});
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.error('Error in OTP API call:', error?.message);
    throw error;
  }
};

export const VerifyOTP = async (mobile, otp) => {
  console.log(mobile, otp);
  try {
    const res = await axios.post(`${Verify_OTP}`, {mobile, otp});
    console.log(res.data, 'otp');
    return res.data;
  } catch (error) {
    console.log('Error in OTP API call:', error.response.data);
    throw error; // Rethrow the error to notify the caller
  }
};

export const updateFace = async (formData, token) => {
  try {
    const res = await axios.post(`${ADD_FACE_ID}`, formData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('API response:', res.data);
    return res.data;
  } catch (error) {
    console.error(
      'Error uploading photo:',
      error.response?.data || error.message,
    );
    throw error;
  }
};
