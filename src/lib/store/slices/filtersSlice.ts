
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum SortOptions {
    DEFAULT_SORT = "DEFAULT",
    ALPHABET = 'ALPHABET',
    PRICE_ASC = 'PRICE_ASC',
    PRICE_DESC = 'PRICE_DESC',
}

export interface filtersState {
  searchString: string
  brandSelectedId: number;
  brandSelectedName: string;
  modelSelectedId: number;
  modelSelectedName: string;
  modificationSelectedId: number;
  modificationSelectedName: string;
  sort: SortOptions
  priceMinValue: undefined | number;
  priceMaxValue: undefined | number;
  visibleProductsCount: number;
  hiddenProductsCount: number;
  productsLoading: boolean;
}

const initialState: filtersState = {
    searchString: '',
    brandSelectedId: -1,
    brandSelectedName: 'Select Brand',
    modelSelectedId: -1,
    modelSelectedName: 'Select Model',
    modificationSelectedId: -1,
    sort: SortOptions.DEFAULT_SORT,
    modificationSelectedName: 'Select Modification',
    priceMinValue: undefined,
    priceMaxValue: undefined,
    visibleProductsCount: 6,
    hiddenProductsCount: 7,
    productsLoading: true,
};

export const filtersSlice = createSlice( {
    name: "filters",
    initialState,
    reducers: {
        setSearchString: ( state, action: PayloadAction<string> ) => {
            state.searchString = action.payload;
        },
        setBrandSelectedId: ( state, action: PayloadAction<number> ) => {
            state.brandSelectedId = action.payload;
        },
        setBrandSelectedName: ( state, action: PayloadAction<string> ) => {
            state.brandSelectedName= action.payload;
        },
        setModelSelectedId: ( state, action: PayloadAction<number> ) => {
            state.modelSelectedId = action.payload;
        },
        setModelSelectedName: ( state, action: PayloadAction<string> ) => {
            state.modelSelectedName = action.payload;
        },
        setModificationSelectedId: ( state, action: PayloadAction<number> ) => {
            state.modificationSelectedId= action.payload;
        },
        setModificationSelectedName: ( state, action: PayloadAction<string> ) => {
            state.modificationSelectedName= action.payload;
        },
        setPriceMinValue: ( state, action: PayloadAction<number> ) => {
            state.priceMinValue = action.payload;
        },
        setPriceMaxValue: ( state, action: PayloadAction<number> ) => {
            state.priceMaxValue= action.payload;
        },
        showMoreVisibleProducts: ( state ) => {
            state.visibleProductsCount = state.visibleProductsCount + 6;
        },
        resetVisibleProducts: ( state ) => {
            state.visibleProductsCount = 6;
        },
        showMoreHiddenProducts: ( state ) => {
            state.hiddenProductsCount = state.visibleProductsCount + 6;
        },
        setVisibleProductsCount: ( state, action: PayloadAction<number> ) => {
            state.visibleProductsCount = action.payload
        },
        setHiddenProductsCount: ( state, action: PayloadAction<number> ) => {
            state.hiddenProductsCount = action.payload
        },
        resetHiddenProducts: ( state ) => {
            state.hiddenProductsCount = 12;
        },
        setProductsLoading: ( state, action: PayloadAction<boolean> ) => {
            state.productsLoading = action.payload;
        },
        sortProductsAlphabetically : ( state ) => {
            state.sort = SortOptions.ALPHABET;
        },
        sortProductsPriceAscending : ( state ) => {
            state.sort = SortOptions.PRICE_ASC;
        },
        sortProductsPriceDescending : ( state ) => {
            state.sort = SortOptions.PRICE_DESC;
        }
    },
} );

export const { setSearchString, setBrandSelectedId, setModelSelectedId, setModificationSelectedId, setBrandSelectedName, setModelSelectedName, setPriceMinValue, setPriceMaxValue, setModificationSelectedName, resetVisibleProducts, showMoreVisibleProducts, showMoreHiddenProducts, resetHiddenProducts, setHiddenProductsCount, setProductsLoading, sortProductsAlphabetically, sortProductsPriceAscending, sortProductsPriceDescending, setVisibleProductsCount } =
  filtersSlice.actions;

export default filtersSlice.reducer;
