import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getDeliveryInfoData } from "../../services/deliveryInfoService";
import {DeliveryInfoDTO,DeliveryInfoStateDTO } from "../../types/deliveryInformationDto";

const initialState: DeliveryInfoStateDTO = {
  deliveryInfo: null,
  loading: false,
  error: null,
};

export const fetchDeliveryInfo = createAsyncThunk<DeliveryInfoDTO>(
  "deliveryInfo/fetchDeliveryInfo",
  async () => {
    const res = await getDeliveryInfoData();
    console.log(res);
    
    return res;
  }
);

const deliveryInfoSlice = createSlice({
  name: "deliveryInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeliveryInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchDeliveryInfo.fulfilled,
        (state, action: PayloadAction<DeliveryInfoDTO>) => {
          state.loading = false;
          state.deliveryInfo = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchDeliveryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch delivery info";
      });
  },
});

export default deliveryInfoSlice.reducer;
