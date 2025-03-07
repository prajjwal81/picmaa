import axios from 'axios';
import {Get_Event_List, SHARE} from '.';

export const getEventList = async () => {
  try {
    const res = await axios.get(`${Get_Event_List}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const Share = async () => {
  try {
    const res = await axios.get(`${SHARE}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
