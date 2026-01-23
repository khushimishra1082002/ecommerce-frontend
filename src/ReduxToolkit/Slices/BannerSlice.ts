import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BannerDTO, BannerStateDTO } from "../../types/banner";
import { getBannerData } from "../../services/BannerServices";

const initialState: BannerStateDTO = {
  banners: [],
  loading: false,
  error: null,
};

export const fetchAllBanners = createAsyncThunk<BannerDTO[]>(
  "category/fetchAllBanners",
  async () => {
    const res = await getBannerData();
    return res;
  }
);

const BannerSlice = createSlice({
  name: "banners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllBanners.fulfilled,
        (state, action: PayloadAction<BannerDTO[]>) => {
          state.loading = false;
          state.banners = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch banners";
      });
  },
});

export default BannerSlice.reducer;
