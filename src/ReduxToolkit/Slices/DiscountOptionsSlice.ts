import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDiscountOptionsData } from "../../services/DiscountOptionsService";
import { DiscountOptionDTO } from "../../types/discountOptions";

interface DiscountOptionsState {
  discountOptions: DiscountOptionDTO | null;
  loading: boolean;
  error: string | null;
}

const initialState: DiscountOptionsState = {
  discountOptions: null,
  loading: false,
  error: null,
};

export const fetchDiscountOptions = createAsyncThunk(
  "discount/fetchDiscountOptions",
  async (categoryId: string) => {
    const data = await getDiscountOptionsData  (categoryId);
    return data;
  }
);

const discountOptionsSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiscountOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiscountOptions.fulfilled, (state, action) => {
        state.discountOptions = action.payload;
        state.loading = false;
      })
      .addCase(fetchDiscountOptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch discount options";
      });
  },
});

export default discountOptionsSlice.reducer;
