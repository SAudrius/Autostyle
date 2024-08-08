import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PopupState {
  value: boolean;
  popupAnimation: boolean;
  popupElementKey: string | null;
  message: string;
}

const initialState: PopupState = {
    value: false,
    popupAnimation: false,
    popupElementKey: null,
    message: ''
};

export const popupSlice = createSlice( {
    name: "popup",
    initialState,
    reducers: {
        popupOn: ( state ) => {
            state.value = true;
        },
        popupOff: ( state ) => {
            state.value = false;
        },
        popupAnimateOn: ( state ) => {
            state.popupAnimation = true;
        },
        popupAnimateOff: ( state ) => {
            state.popupAnimation = false;
        },
        popupSetElementKey: ( state, action: PayloadAction<string> ) => {
            state.popupElementKey = action.payload;
        },
        popupSetErrorMessage: ( state, action: PayloadAction<string> ) => {
            state.message = action.payload
        }
    },
} );

export const { popupOn, popupOff, popupAnimateOn, popupAnimateOff, popupSetElementKey, popupSetErrorMessage } = popupSlice.actions;

export default popupSlice.reducer;
