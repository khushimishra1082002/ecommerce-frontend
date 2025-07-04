import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SubcategoryDTO, SubcategoryStateDTO } from "../../types/subcategory";
import { getSubcategoryData } from "../../services/SubcategoryService";

const initialState: SubcategoryStateDTO = {
  subcategories: [],
  loading: false,
  error: null,
};

export const fetchSubcategories = createAsyncThunk(
  "subcategory/fetchSubcategories",
  async () => {
    const data = await getSubcategoryData();
    console.log("Subcategories returned from service:", data);
    return data as SubcategoryDTO[];
  }
);

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        console.log("Slice received subcategories:", action.payload);
        state.loading = false;
        state.subcategories = action.payload;
      })

      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch subcategories";
      });
  },
});
export default subcategorySlice.reducer;
