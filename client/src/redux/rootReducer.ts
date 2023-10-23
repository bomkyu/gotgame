import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './store/mainSlice';
import userReducer from './store/userSlice'

const store = configureStore({
  reducer: {
    main : mainReducer,
    user : userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;