import authSlice from "@lib/store/slices/authSlice";
import cartSlice from "@lib/store/slices/cartSlice";
import globalLoadingSlice from "@lib/store/slices/globalLoadingSlice";
import menuSlice from "@lib/store/slices/menuSlice";
import modalSlice from "@lib/store/slices/modalSlice";
import searchSlice from "@lib/store/slices/searchSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    modal: modalSlice,
    cart: cartSlice,
    menu: menuSlice,
    search: searchSlice,
    globalLoading: globalLoadingSlice,
  },
});

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
