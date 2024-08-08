import { createSlice } from "@reduxjs/toolkit";

export interface menuState {
  value: boolean;
  menuAnimation: boolean;
}

const initialState: menuState = {
    value: false,
    menuAnimation: false,
};

export const menuSlice = createSlice( {
    name: "menu",
    initialState,
    reducers: {
        menuOn: ( state ) => {
            state.value = true;
        },
        menuOff: ( state ) => {
            state.value = false;
        },
        menuAnimateOn: ( state ) => {
            state.menuAnimation = true;
        },
        menuAnimateOff: ( state ) => {
            state.menuAnimation = false;
        },
    },
} );

export const { menuOn, menuOff, menuAnimateOn, menuAnimateOff } =
  menuSlice.actions;

export default menuSlice.reducer;
