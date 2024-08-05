import { createSlice } from "@reduxjs/toolkit";

export interface cartState {
  value: boolean;
  cartAnimation: boolean;
}

const initialState: cartState = {
    value: false,
    cartAnimation: false,
};

export const cartSlice = createSlice( {
    name: "cart",
    initialState,
    reducers: {
        cartOn: ( state ) => {
            state.value = true;
        },
        cartOff: ( state ) => {
            state.value = false;
        },
        cartAnimateOn: ( state ) => {
            state.cartAnimation = true;
        },
        cartAnimateOff: ( state ) => {
            state.cartAnimation = false;
        },
    },
} );

export const { cartOn, cartOff, cartAnimateOn, cartAnimateOff } =
  cartSlice.actions;

export default cartSlice.reducer;
