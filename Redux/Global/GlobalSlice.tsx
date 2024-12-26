import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface GlobalState {
  removeBottomTab: boolean;
  profilePhoto: string;
  bucketURL: string;
}

const initialState: GlobalState = {
  removeBottomTab: true,
  profilePhoto: '',
  bucketURL: '/',
};

export const GlobalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleBottomTab: (state, action) => {
      state.removeBottomTab = action.payload;
    },
    setProfilePhoto: (state, action) => {
      state.profilePhoto = action.payload;
    },
    setBucketURL: (state, action) => {
      state.bucketURL = action.payload;
    },
  },
});

export const {toggleBottomTab, setProfilePhoto, setBucketURL} =
  GlobalSlice.actions;

export default GlobalSlice.reducer;
