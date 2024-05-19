import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    storeLogin: (state) => {
      state.isLoggedIn = true;
    },
    storeLogout: (state) => {
      state.isLoggedIn = false;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { storeLogin, storeLogout, setIsLoggedIn } = cartSlice.actions;

export default cartSlice.reducer;
