import axios from 'axios';
import {
  GET_EVENT,
  GET_EVENT_LIST_FOR_USER,
  GET_SELECTED_IMAGES,
  POST_SELECTED_IMAGES,
} from '.';

interface ApiRes {
  token: string;
}

export const getEventList = async (token: string) => {
  try {
    const res = await axios.get(`${GET_EVENT_LIST_FOR_USER}`, {
      headers: {
        Authorization: `${token}`,
      },
    });

    // console.log('Response:', JSON.stringify(res.data.data, null, 2));
    return res?.data;
  } catch (error) {
    console.error('Error:', error.message || error);
    throw new Error('Failed to fetch event list');
  }
};

export const getEvent = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${GET_EVENT}/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    // console.log(JSON.stringify(res.data.data, null, 2));
    return res?.data?.data;
  } catch (error) {
    console.error('Error in getEvent', error);
  }
};

export const postSelectedImages = async (
  images: any,
  eventId: string,
  token: string,
) => {
  console.log(images, 'yele');
  try {
    const res = await axios.post(
      `${POST_SELECTED_IMAGES}`,
      {
        imageUrls: images,
        eventId: eventId,
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
    console.error('Error in postSelectedImages', error);
  }
};

export const getSelectedImages = async (id: string, token: string) => {
  try {
    const res = await axios.get(`${GET_SELECTED_IMAGES}/${id}`, {
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

export const deleteSelectedImages = async (
  images: any,
  eventId: string,
  token: string,
) => {
  try {
    const res = await axios.post(
      `${POST_SELECTED_IMAGES}`,
      {
        imageUrls: images,
        eventId: eventId,
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
    console.error('Error in deleteSelectedImages', error);
  }
};
