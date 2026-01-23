import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: "COD",
  paymentDetails: {}, 
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    clearPaymentInfo: (state) => {
      state.paymentMethod = "";
      state.paymentDetails = {};
    },
  },
});

export const { setPaymentMethod, setPaymentDetails, clearPaymentInfo } = paymentSlice.actions;
export default paymentSlice.reducer;
