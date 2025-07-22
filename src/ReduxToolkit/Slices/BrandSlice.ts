import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BrandDTO, BrandStateDTO } from "../../types/brand";
import { getBrandData } from "../../services/BrandService";
import { getAllBrandByCategoryData } from "../../services/BrandService";

const initialState: BrandStateDTO = {
  brands: [],
  loading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  "subcategory/fetchBrands",
  async () => {
    const data = await getBrandData();
    console.log("Brands returned from service:", data);
    return data as BrandDTO[];
  }
);

export const fetchBrandsByCategory = createAsyncThunk(
  "subcategory/fetchBrandsByCategory",
  async (categoryID: string) => {
    const data = await getAllBrandByCategoryData(categoryID);
    console.log("Brands returned from service:", data);
    return data as BrandDTO[];
  }
);

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // All brands
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        console.log("Slice received brand:", action.payload);
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch brand";
      })

      .addCase(fetchBrandsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandsByCategory.fulfilled, (state, action) => {
        console.log("Slice received brand by category:", action.payload);
        state.loading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrandsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch brands by category";
      });
  },
});

export default brandSlice.reducer;
