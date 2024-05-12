import { createSlice } from "@reduxjs/toolkit";

export interface searchState {
  value: boolean;
  searchAnimation: boolean;
}

const initialState: searchState = {
  value: false,
  searchAnimation: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchOn: (state) => {
      state.value = true;
    },
    searchOff: (state) => {
      state.value = false;
    },
    searchAnimateOn: (state) => {
      state.searchAnimation = true;
    },
    searchAnimateOff: (state) => {
      state.searchAnimation = false;
    },
  },
});

export const { searchOn, searchOff, searchAnimateOn, searchAnimateOff } =
  searchSlice.actions;

export default searchSlice.reducer;
