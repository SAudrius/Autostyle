import { createSlice } from "@reduxjs/toolkit";

export interface searchState {
  value: string;
  active: boolean;
  searchAnimation: boolean;
}

const initialState: searchState = {
    value: "",
    active: false,
    searchAnimation: false,
};

export const searchSlice = createSlice( {
    name: "search",
    initialState,
    reducers: {
        searchOn: ( state ) => {
            state.active = true;
        },
        searchOff: ( state ) => {
            state.active = false;
        },
        searchAnimateOn: ( state ) => {
            state.searchAnimation = true;
        },
        searchAnimateOff: ( state ) => {
            state.searchAnimation = false;
        },
    },
} );

export const { searchOn, searchOff, searchAnimateOn, searchAnimateOff } =
  searchSlice.actions;

export default searchSlice.reducer;
