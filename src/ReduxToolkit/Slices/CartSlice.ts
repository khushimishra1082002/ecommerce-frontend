import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllCategoryData } from "../../services/CategoryService";
import { CartDTO, CartStateDTO } from "../../types/cart";
import { getCartData } from "../../services/cartService";
import { AddProductInCartData } from "../../services/cartService";
import { UpdateProductQuanityInCartData } from "../../services/cartService";

const initialState: CartStateDTO = {
  cart: null,
  loading: false,
  error: null,
};

export const fetchcartProduct = createAsyncThunk<CartDTO, string>(
  "cart/fetchcartproduct",
  async (userId) => {
    const res = await getCartData(userId);
    return res;
  },
);

export const addToCart = createAsyncThunk<
  CartDTO,
  {
    userId: string;
    productId: string;
    quantity: number;
  }
>("cart/addToCart", async ({ userId, productId, quantity }) => {
  const res = await AddProductInCartData({ userId, productId, quantity });
  return res.cart;
});

export const updateQuantity = createAsyncThunk<
  CartDTO,
  {
    userId: string;
    productId: string;
    quantity: number;
  }
>("cart/updateQuantity", async ({ userId, productId, quantity }) => {
  const res = await UpdateProductQuanityInCartData(userId, productId, quantity);
  return res.cart;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // fetch cart
      .addCase(fetchcartProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchcartProduct.fulfilled,
        (state, action: PayloadAction<CartDTO>) => {
          state.loading = false;
          state.cart = action.payload;
          state.error = null;
        },
      )

      .addCase(fetchcartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch cart";
      })

      // add to cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartDTO>) => {
        state.loading = false;
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add product to cart";
      })

      // update quantity
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        updateQuantity.fulfilled,
        (state, action: PayloadAction<CartDTO>) => {
          state.loading = false;
          state.cart = action.payload;
          state.error = null;
        },
      )
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update quantity";
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
