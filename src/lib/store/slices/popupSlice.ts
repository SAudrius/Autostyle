import { createSlice,PayloadAction } from "@reduxjs/toolkit";

export interface PopupState {
  value: boolean;
  popupAnimation: boolean;
  popupElementKey: string | null;
}

const initialState: PopupState = {
  value: false,
  popupAnimation: false,
  popupElementKey: null,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    popupOn: (state) => {
      state.value = true;
    },
    popupOff: (state) => {
      state.value = false;
    },
    popupAnimateOn: (state) => {
      state.popupAnimation = true;
    },
    popupAnimateOff: (state) => {
      state.popupAnimation = false;
    },
    popupSetElementKey: (state,action: PayloadAction<string>) => {
      state.popupElementKey = action.payload;
    },
  },
});

export const { popupOn, popupOff, popupAnimateOn, popupAnimateOff, popupSetElementKey } = popupSlice.actions;

export default popupSlice.reducer;
