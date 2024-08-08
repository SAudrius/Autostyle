import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  value: boolean;
  modalAnimation: boolean;
}

const initialState: ModalState = {
    value: false,
    modalAnimation: false,
};

export const modalSlice = createSlice( {
    name: "modal",
    initialState,
    reducers: {
        modalOn: ( state ) => {
            state.value = true;
        },
        modalOff: ( state ) => {
            state.value = false;
        },
        modalAnimateOn: ( state ) => {
            state.modalAnimation = true;
        },
        modalAnimateOff: ( state ) => {
            state.modalAnimation = false;
        },
    },
} );

export const { modalOn, modalOff, modalAnimateOn, modalAnimateOff } =
  modalSlice.actions;

export default modalSlice.reducer;
