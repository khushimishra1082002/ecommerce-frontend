import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { PriceRangeDTO, PriceRangeStateDTO } from "../../types/priceRange";
import {getPriceRangeData} from "../../services/priceRangesService"

const initialState: PriceRangeStateDTO = {
  priceRanges: [],
  loading: false,
  error: null,
};

export const fetchPriceRange = createAsyncThunk(
  "priceRanges/fetchPriceRange",
  async (categoryId: string) => {
    const data = await getPriceRangeData(categoryId);
    console.log("PriceRange returned from service:", data);
    return data as PriceRangeDTO[];
  }
);

const PriceRangeSlice = createSlice({
  name: "priceRanges",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPriceRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPriceRange.fulfilled, (state, action) => {
        console.log("Slice received subcategories:", action.payload);
        state.loading = false;
        state.priceRanges = action.payload;
      })

      .addCase(fetchPriceRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch priceRanges";
      });
  },
});
export default PriceRangeSlice.reducer;
