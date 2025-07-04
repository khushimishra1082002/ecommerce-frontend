import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllProductData } from "../../services/ProductService";
import {ProductDTO, ProductStateDTO } from "../../types/product";

const initialState: ProductStateDTO = {
  products: [],
  loading: false,
  error: null,
};

export const fetchAllProducts = createAsyncThunk<ProductDTO[]>(
  "products/fetchAllProducts",
  async () => {
    const res = await getAllProductData();
    return res;
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllProducts.fulfilled,
        (state, action: PayloadAction<ProductDTO[]>) => {
          state.loading = false;
          state.products = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default ProductSlice.reducer;
