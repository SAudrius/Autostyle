import { createSlice } from "@reduxjs/toolkit";

export interface globalLoadingState {
  loading: boolean;
}

const initialState: globalLoadingState = {
  loading: false,
};

export const cartSlice = createSlice({
  name: "globalLoading",
  initialState,
  reducers: {
    globalLoadingOff: (state) => {
      state.loading = false;
    },
    globalLoadingOn: (state) => {
      state.loading = true;
    },
  },
});

export const { globalLoadingOff, globalLoadingOn } = cartSlice.actions;

export default cartSlice.reducer;
