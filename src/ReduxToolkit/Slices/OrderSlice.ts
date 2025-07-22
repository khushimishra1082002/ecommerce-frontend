import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllOrdersData } from "../../services/OrderService";
import { OrderDTO,OrderStateDTO } from "../../types/order";

const initialState: OrderStateDTO = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchAllOrders = createAsyncThunk<OrderDTO[]>(
  "order/fetchAllOrders",
  async () => {
    const res = await getAllOrdersData();
    return res;
  }
);


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchAllOrders.fulfilled,
        (state, action: PayloadAction<OrderDTO[]>) => {
          state.loading = false;
          state.orders = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch orders";
      });
  },
});

export default orderSlice.reducer;
