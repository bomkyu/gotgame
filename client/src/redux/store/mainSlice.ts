
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MainState {
    selectedTab: string;
    currentPage: number;
    searchInputValue: string;
   
  }

const initialState: MainState = {
  selectedTab: 'ALL',
  currentPage: 1,
  searchInputValue : ''
  // 초기 상태 추가
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setSearchInputValue: (state, action: PayloadAction<string>) => {
      state.searchInputValue = action.payload;
    },
  },
});

export const { setTab, setCurrentPage, setSearchInputValue } = mainSlice.actions;
export default mainSlice.reducer;