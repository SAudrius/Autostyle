import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
  isLoggedIn: boolean;
}

const initialState: authState = {
    isLoggedIn: false,
};

export const authSlice = createSlice( {
    name: "auth",
    initialState,
    reducers: {
        storeLogin: ( state ) => {
            state.isLoggedIn = true;
        },
        storeLogout: ( state ) => {
            state.isLoggedIn = false;
        },
        setIsLoggedIn: ( state, action: PayloadAction<boolean> ) => {
            state.isLoggedIn = action.payload;
        },
    },
} );

export const { storeLogin, storeLogout, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
