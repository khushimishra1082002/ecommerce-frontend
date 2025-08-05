import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PriceRange, FiltersState } from "../../types/filter";
import { BrandDTO } from "../../types/brand";

const initialState: FiltersState = {
  categories: "",
  subcategories: [],
  gender: [],
  brands: [],
  priceRange: { min: "", max: "" },
  size: [],
  colors: [],
  inStock: null,
  discount: [],
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action: PayloadAction<string[]>) => {
      state.subcategories = action.payload;
    },
    setGender: (state, action: PayloadAction<string[]>) => {
      state.gender = action.payload;
    },
    setBrands: (state, action: PayloadAction<string[]>) => {
    state.brands = action.payload;
    console.log("state.brands",state.brands);
    },
    

    setPriceRange: (state, action: PayloadAction<PriceRange>) => {
      state.priceRange = action.payload;
    },
    setDiscount: (state, action: PayloadAction<string[]>) => {
      console.log("action.payload....", action.payload);

      state.discount = action.payload;
    },
    setSize: (state, action: PayloadAction<string[]>) => {
      state.size = action.payload;
    },
    setAvailability(state, action) {
      console.log("action", action.payload);

      state.inStock = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const {
  setCategory,
  setSubcategories,
  setGender,
  setBrands,
  setPriceRange,
  setSize,
  setAvailability,
  clearFilters,
  setDiscount,
} = filterSlice.actions;

export default filterSlice.reducer;
