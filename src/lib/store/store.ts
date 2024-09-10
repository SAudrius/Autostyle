import { configureStore } from "@reduxjs/toolkit";

import authSlice from "@/lib/store/slices/authSlice";
import cartSlice from "@/lib/store/slices/cartSlice";
import filtersSlice from "@/lib/store/slices/filtersSlice";
import globalLoadingSlice from "@/lib/store/slices/globalLoadingSlice";
import menuSlice from "@/lib/store/slices/menuSlice";
import modalSlice from "@/lib/store/slices/modalSlice";
import popupSlice from "@/lib/store/slices/popupSlice";
import searchSlice from "@/lib/store/slices/searchSlice";

export const store = configureStore( {
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        modal: modalSlice,
        popup: popupSlice,
        menu: menuSlice,
        search: searchSlice,
        filters: filtersSlice,
        globalLoading: globalLoadingSlice,
    },
} );

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
