import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./slices/authSlice";
import cartSlice from "./slices/cartSlice";
import menuSlice from "./slices/menuSlice";
import modalSlice from "./slices/modalSlice";
import searchSlice from "./slices/searchSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      modal: modalSlice,
      cart: cartSlice,
      menu: menuSlice,
      search: searchSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
