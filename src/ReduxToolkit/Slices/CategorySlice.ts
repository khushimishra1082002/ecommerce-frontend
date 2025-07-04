import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategoryData } from "../../services/CategoryService";
import { CategoryDTO, CategoryStateDTO } from "../../types/category";

const initialState: CategoryStateDTO = {
  category: [],
  loading: false,
  error: null,
};

export const fetchAllCategory = createAsyncThunk<CategoryDTO[]>(
  "category/fetchAllCategory",
  async () => {
    const res = await getAllCategoryData();
    return res;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllCategory.fulfilled,
        (state, action: PayloadAction<CategoryDTO[]>) => {
          state.loading = false;
          state.category = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch category";
      });
  },
});

export default categorySlice.reducer;
