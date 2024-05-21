import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import menuSlice from "./slices/menuSlice";
import modalSlice from "./slices/modalSlice";
import searchSlice from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    cart: cartSlice,
    menu: menuSlice,
    search: searchSlice,
  },
});
// Infer the type of makeStore
export type RootState = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
