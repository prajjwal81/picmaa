import axios from 'axios';
import {
  GET_PHOTOPACKEGE_LIST,
  Get_Photographer_Detail,
  Get_Photographer_List,
} from '.';

export const getPhotograherList = async () => {
  try {
    const res = await axios.post(`${Get_Photographer_List}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFilterPhotograherList = async filter => {
  try {
    const res = await axios.post(`${Get_Photographer_List}`, {filter});
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPhotograherDetail = async id => {
  try {
    const res = await axios.get(`${Get_Photographer_Detail}/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPhotograherPackage = async (id, token) => {
  try {
    const res = await axios.get(`${GET_PHOTOPACKEGE_LIST}/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(JSON.stringify(res.data, null, 2));
    return res?.data;
  } catch (error) {
    console.error('Error in getSelectedImages', error);
  }
};
