import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLoggedIn: boolean;
  userInfo: {
    id: string;
    nickName: string;
    platform: string;
  };
}

const initialState: UserState = {
  isLoggedIn : false,
  userInfo: {
    id: '',
    nickName: '',
    platform: ''
  }
  };

  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserInfo: (state, action: PayloadAction<{ id: string; nickName: string; platform: string }>) => {
        state.isLoggedIn = true;
        state.userInfo = action.payload;
      },
      logout : (state) => {
        state.isLoggedIn = false;
        state.userInfo = { id: '', nickName: '', platform: '' };
      }
      },
  })
export const { setUserInfo, logout } = userSlice.actions;
export default userSlice.reducer;