import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import menuSlice from "./slices/menuSlice";
import modalSlice from "./slices/modalSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      modal: modalSlice,
      cart: cartSlice,
      menu:menuSlice
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
