import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Events from './components/Events';
import ImageUploadScreen from './components/gettingDatafromS3';
import {getItem} from '../..//utils/asyncStorage';
import MultiAngleCapture from '../common/multiangleCamera';
import {useDispatch, useSelector} from 'react-redux';
import {toggleBottomTab} from '../../../Redux/Global/GlobalSlice';

export default function Home() {
  const [faceid, setFaceid] = useState(false);
  const removeBottomTab = useSelector(state => state?.global?.removeBottomTab);
  const dispatch = useDispatch();

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  heading: {
    borderWidth: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
});
