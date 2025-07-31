import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategoryData } from "../../services/CategoryService";
import { WishlistDTO, WishlistStateDTO } from "../../types/wishlist";
import { getWishlistData } from "../../services/wishlistService";
import { AddProductInWishlistData } from "../../services/wishlistService";

const initialState: WishlistStateDTO = {
  wishlist: null,
  loading: false,
  error: null,
};

export const fetchWishlistProduct = createAsyncThunk<WishlistDTO, string>(
  "wishlist/fetchWishlistProduct",
  async (userId) => {
    const res = await getWishlistData(userId);
    return res;
  }
);

export const addToWishlist = createAsyncThunk<
  WishlistDTO,
  { userId: string; productId: string }
>("wishlist/addToWishlist", async ({ userId, productId }) => {
  const res = await AddProductInWishlistData({ userId, productId });
  return res;
});

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchWishlistProduct.fulfilled,
        (state, action: PayloadAction<WishlistDTO>) => {
          state.loading = false;
          state.wishlist = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchWishlistProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch wishlist";
      })
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addToWishlist.fulfilled,
        (state, action: PayloadAction<WishlistDTO>) => {
          state.loading = false;
          state.wishlist = action.payload;
          state.error = null;
        }
      )
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add to wishlist";
      });
  },
});

export default wishlistSlice.reducer;
