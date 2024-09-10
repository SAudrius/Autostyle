import { createSlice } from "@reduxjs/toolkit";

export interface searchState {
  value: string;
  active: boolean;
  searchAnimation: boolean;
  searchGrid: 'small'| 'big';
  searchFilter: boolean;
  searchSort: boolean;
  searchMobileFilter: boolean

}

const initialState: searchState = {
    value: "",
    active: false,
    searchAnimation: false,
    searchGrid: 'small',
    searchFilter: false,
    searchSort: false,
    searchMobileFilter: false,
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
        setSearchGridSmall: ( state ) => {
            state.searchGrid = 'small'
        },
        setSearchGridBig: ( state ) => {
            state.searchGrid = 'big'
        },
        searchFilterOn: ( state ) => {
            state.searchFilter = true
        }, 
        searchFilterOff: ( state ) => {
            state.searchFilter = false
        },
        searchSortOn: ( state ) => {
            state.searchSort = true;
        },
        searchSortOff: ( state ) => {
            state.searchSort = false;
        },
        searchMobileFilterOn: ( state ) => {
            state.searchMobileFilter = true;
        },
        searchMobileFilterOff: ( state ) =>{
            state.searchMobileFilter = false;
        },
    },
} );

export const { searchOn, searchOff, searchAnimateOn, searchAnimateOff, setSearchGridSmall, setSearchGridBig, searchFilterOn, searchFilterOff, searchSortOn, searchSortOff, searchMobileFilterOn, searchMobileFilterOff } =
  searchSlice.actions;

export default searchSlice.reducer;
