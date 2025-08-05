// src/ReduxToolkit/Slices/paymentSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethod: "COD", // 'cod' ya 'online'
  paymentDetails: {}, // For online payment, e.g., card details (optional)
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
