import React from 'react';
import {Alert} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

export const RazorpayPayment = async amount => {
  try {
    const finalAmount = amount * 100;
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: 'rzp_test_tX7OYv8wO9psps',
      amount: finalAmount,
      name: 'UNIFI CARS',
      order_id: '',
      prefill: {
        email: 'gaurav.kumar@example.com',
        contact: '9191919191',
        name: 'Gaurav Kumar',
      },
      theme: {color: '#fff'},
    };
    const data = await RazorpayCheckout.open(options);
    console.log('razor', data);
    return data;
  } catch (error) {
    console.log('Error', error);
  }
};
