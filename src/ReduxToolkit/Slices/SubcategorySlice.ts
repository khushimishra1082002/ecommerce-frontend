import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SubcategoryDTO, SubcategoryStateDTO } from "../../types/subcategory";
import { getAllSubcategoryByCategoryData, getSubcategoryData } from "../../services/SubcategoryService";

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

export const fetchSubcategoriesByCategory = createAsyncThunk(
  "subcategory/fetchSubcategoriesByCategory",
  async (categoryId) => {
    const data = await getAllSubcategoryByCategoryData(categoryId);
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
    // fetchSubcategories (all)
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
    })

    // ✅ fetchSubcategoriesByCategory (specific to a category)
    .addCase(fetchSubcategoriesByCategory.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchSubcategoriesByCategory.fulfilled, (state, action) => {
      console.log("Slice received subcategories by category:", action.payload);
      state.loading = false;
      state.subcategories = action.payload;
    })
    .addCase(fetchSubcategoriesByCategory.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Failed to fetch subcategories by category";
    });
}

});
export default subcategorySlice.reducer;
