import {configureStore} from '@reduxjs/toolkit';
import GlobalReducer from '../Global/GlobalSlice';

export const store = configureStore({
  reducer: {
    global: GlobalReducer,
  },
});
