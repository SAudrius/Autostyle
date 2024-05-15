import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface authState {
  isLoggedIn: boolean;
}

const initialState: authState = {
  isLoggedIn: false,
};

export const cartSlice = createSlice({
  name: "aurh",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { login, logout, setIsLoggedIn } = cartSlice.actions;

export default cartSlice.reducer;
