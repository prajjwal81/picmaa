import axios from 'axios';
import {
  CREATE_ORDER,
  DELETE_MY_ACCOUNT,
  FILL_FORM_DETAIL,
  GET_EVENT_LIST_WITH_UPDATES,
  GET_NUMBERS,
  Get_USER_PROFILE,
  UPDATE_ORDER_DETAIL,
  USER_PROFILE_UPDATE,
} from '.';
import {getItem} from '../utils/asyncStorage';

export const getUserProfile = async () => {
  try {
    const user = await getItem();
    let token = user.accessToken;
    const res = await axios.get(`${Get_USER_PROFILE}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const userProfileUpdate = async (name, email, phone) => {
  try {
    const user = await getItem();
    let token = user.accessToken;
    const res = await axios.put(`${USER_PROFILE_UPDATE}`, {
      name,
      email,
      phone,
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (id, token) => {
  try {
    const res = await axios.post(
      `${CREATE_ORDER}`,
      {
        packageId: id,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    // console.log(JSON.stringify(res.data, null, 2));
    return res?.data;
  } catch (error) {
    console.error('Error in createOrder', error);
  }
};

export const updateOrderDetails = async (transactionid, id, token) => {
  try {
    const res = await axios.post(
      `${UPDATE_ORDER_DETAIL}/${transactionid}`,
      {
        razorpay_payment_id: id,
      },
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    // console.log(JSON.stringify(res.data, null, 2));
    return res?.data;
  } catch (error) {
    console.error('Error in updateOrderDetails', error);
  }
};

export const fillForm = async (
  packageId,
  transactionId,
  photographerId,
  name,
  street,
  city,
  state,
  postalCode,
  country,
) => {
  try {
    const user = await getItem();
    let token = user.accessToken;
    const res = await axios.put(`${FILL_FORM_DETAIL}`, {
      packageId,
      transactionId,
      photographerId,
      venue: {
        name,
        street,
        city,
        state,
        postalCode,
        country,
      },
      headers: {
        Authorization: `${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getEventListOnType = async (token: string, type: string) => {
  try {
    const res = await axios.get(`${GET_EVENT_LIST_WITH_UPDATES}`, {
      params: {
        status: type,
      },
      headers: {
        Authorization: `${token}`,
      },
    });

    // console.log('Response:', JSON.stringify(res.data.data, null, 2));
    return res?.data;
  } catch (error) {
    console.error('Error getevent  with type:', error.message || error);
    throw new Error('Failed to fetch event list');
  }
};

export const DeleteAccount = async (token: string) => {
  try {
    const res = await axios.get(`${DELETE_MY_ACCOUNT}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error(
      'Error getevent  with deleting the user:',
      error.message || error,
    );
    throw new Error('Failed to fetch event list');
  }
};

export const getNumber = async (token: string) => {
  try {
    const res = await axios.get(`${GET_NUMBERS}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return res?.data;
  } catch (error) {
    console.error('Error getNumber :', error.message || error);
    throw new Error('Failed to fetch getNumber list');
  }
};
