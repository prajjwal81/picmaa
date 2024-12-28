import axios from 'axios';
import {CREATE_ORDER, Get_USER_PROFILE, USER_PROFILE_UPDATE} from '.';
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
    console.error('Error in getSelectedImages', error);
  }
};
