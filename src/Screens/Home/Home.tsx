import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Events from './components/Events';
import ImageUploadScreen from './components/gettingDatafromS3';
import {getItem} from '../..//utils/asyncStorage';
import MultiAngleCapture from '../common/multiangleCamera';
import {useDispatch, useSelector} from 'react-redux';
import {toggleBottomTab} from '../../../Redux/Global/GlobalSlice';
import FillDetailsScreen from '../common/fillForm';

export default function Home() {
  const [faceid, setFaceid] = useState(false);

  useEffect(() => {
    const loginhandler = async () => {
      const res = await getItem();
      if (res.face !== '') {
        setFaceid(true);
      }
    };
    loginhandler();
  }, []);

  return (
    <View>
      {/* {faceid ? <Events /> : <MultiAngleCapture />} */}
      {/* <ImageUploadScreen /> */}
      <Events />
      {/* <FillDetailsScreen /> */}
    </View>
  );
}
