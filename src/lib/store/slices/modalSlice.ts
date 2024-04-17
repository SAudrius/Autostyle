import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  value: boolean;
}

const initialState: ModalState = {
  value: false,
};

export const modalSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    on: (state) => {
      state.value = true;
    },
    off: (state) => {
      state.value = false;
    },
  },
});

export const { on, off } = modalSlice.actions;

export default modalSlice.reducer;
